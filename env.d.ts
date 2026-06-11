declare module "*.css" {}

declare module "javascript-terminal" {

    import { List, Map, MapOf, RecordOf } from "immutable"

    class Emulator {
        execute(state: emulatorState, command: string): emulatorState
    }

    class EmulatorState {
        static createEmpty(): EmulatorState
        static create(immutable: {
            commandMapping: Map
        }): EmulatorState
        getEnvVariables(): Map<string, string>
        getOutputs(): List<RecordOf<
            {
                type: "TEXT_OUTPUT" | "TEXT_ERROR_OUTPUT"
                content: string
            } | {
                type: "HEADER_OUTPUT_TYPE"
                content: RecordOf<{ command: string, cwd: string }>
            }
        >>
    }

    namespace CommandMapping {
        function create(commandMapping): Map<string, MapOf<{
            function()
            optDef: Map<string, string>
        }>>
    }

}
