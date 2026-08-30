import {
  bindHarnessHostPlugin,
  type HarnessDefinition,
} from "./types.js";
import { buildHarnessMcpServers } from "./harness-mcp.js";

/**
 * NYX — Experimental Agent Harness
 *
 * Dual-mode operation:
 * 1. INVESTIGATOR: Read-only access to files, web search, MCP tools
 * 2. ORCHESTRATOR: Policy-driven execution with explicit constraints
 *
 * All operations are auditable and execute within defined guardrails.
 */
export const nyxHarnessDefinition: HarnessDefinition = {
  id: "nyx",
  hostCommand: "run-nyx",
  displayName: "NYX",
  runtimeAdapter: {
    id: "nyx",
    hostCommand: "run-nyx",
    displayName: "NYX — Investigator & Policy Orchestrator",
    capabilities: {
      requiresBackend: true, // Requires runtime backend for policy enforcement
      supportsStructuredOutput: true, // Reasoning traces + audit logs
      supportsWaitingUser: true, // Controlled iteration with decision points
      supportsSkills: true, // Policy execution as skills
      supportsMcpTools: true, // Read-only MCP introspection
      resumesFromExecContextSessionId: true, // Stateful investigation sessions
    },
    supportedModels: [
      {
        id: "claude-opus-4-8",
        label: "Claude Opus 4.8 (Default)",
        provider: "anthropic",
        default: true,
      },
      {
        id: "claude-sonnet-4-6",
        label: "Claude Sonnet 4.6",
        provider: "anthropic",
      },
    ],
    buildRunnerPrepPlan() {
      return {
        stageWorkspaceSkills: true, // Load policy definitions
        stageWorkspaceCommands: false, // No direct CLI commands
        prepareMcpTooling: true, // Enable MCP servers (read-only mode)
        startWorkspaceMcpSidecar: true, // Persistent MCP connection
        bootstrapResolvedApplications: false, // No browser automation
      };
    },
    buildHarnessHostRequest(params) {
      return {
        workspace_id: params.request.workspace_id,
        workspace_dir: params.bootstrap.workspaceDir,
        agent_cwd: params.bootstrap.agentCwd ?? params.bootstrap.workspaceDir,
        session_id: params.request.session_id,
        input_id: params.request.input_id,
        instruction: params.request.instruction,
        context_messages: params.runtimeConfig.context_messages ?? [],
        tools: {
          // Investigation tools (read-only)
          ...params.runtimeConfig.tools,
          file_read: true,
          web_search: true,
          mcp_introspect: true,
          // Disable mutation tools
          file_write: false,
          file_delete: false,
          command_execute: false,
          browser_interact: false,
        },
        attachments: params.request.attachments ?? [],
        image_urls: params.request.image_urls ?? [],
        thinking_value: params.request.thinking_value ?? "enabled",
        debug: Boolean(params.request.debug),
        harness_session_id: params.bootstrap.requestedHarnessSessionId,
        persisted_harness_session_id: params.bootstrap.persistedHarnessSessionId,
        provider_id: params.runtimeConfig.provider_id,
        model_id: params.runtimeConfig.model_id,
        selected_model:
          typeof params.request.model === "string" &&
          params.request.model.trim().length > 0
            ? params.request.model.trim()
            : null,
        timeout_seconds: params.timeoutSeconds,
        runtime_api_base_url: params.runtimeApiBaseUrl ?? null,
        system_prompt: params.runtimeConfig.system_prompt,
        workspace_skill_dirs: params.workspaceSkills.map(
          (skill) => skill.source_dir
        ),

        // NYX-specific configuration
        nyx_mode: {
          investigation_enabled: true,
          orchestration_enabled: true,
          audit_trail: true,
          policy_enforcement_strict: true,
          reasoning_depth: "extended",
        },

        mcp_servers: buildHarnessMcpServers(params),
        mcp_tool_refs: params.mcpToolRefs.map((toolRef) => ({
          ...toolRef,
          nyx_access_mode: "read", // Enforce read-only for MCP tools
        })),
        workspace_config_checksum: params.runtimeConfig.workspace_config_checksum,
        run_started_payload: params.runStartedPayload,
        model_client: {
          model_proxy_provider: params.runtimeConfig.model_client.model_proxy_provider,
          api_key: params.runtimeConfig.model_client.api_key,
          base_url: params.runtimeConfig.model_client.base_url,
          default_headers: params.runtimeConfig.model_client.default_headers,
        },
        agent_role: "investigator-orchestrator",
      };
    },

    async describeRuntimeStatus(context) {
      // NYX requires backend readiness for policy enforcement
      if (!context.configLoaded || !context.backendConfigPresent) {
        return {
          ready: false,
          state: "awaiting_config",
        };
      }

      if (context.backendReadinessTarget) {
        const isReady = await context.probeBackendReadiness(
          context.backendReadinessTarget
        );
        return {
          ready: isReady,
          state: isReady ? "ready" : "backend_starting",
        };
      }

      return {
        ready: true,
        state: "ready",
      };
    },

    async handleRuntimeConfigUpdated(context) {
      // Reload policy definitions when config changes
      await context.writeBootstrapConfigIfAvailable();
      await context.ensureSelectedHarnessReady();
    },

    async ensureReady(context) {
      // Verify policy engine is accessible before proceeding
      await context.ensureHarnessBackendReady();
    },
  },

  bindHostPlugin(implementation) {
    return bindHarnessHostPlugin(nyxHarnessDefinition, implementation);
  },
};
