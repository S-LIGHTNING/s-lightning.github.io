<script setup lang="ts">

import { onMounted, onUnmounted, useTemplateRef, watchEffect } from "vue"
import "@xterm/xterm/css/xterm.css"
import { Terminal } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"
import { Readline } from "xterm-readline"
import { WebLinksAddon } from "@xterm/addon-web-links"
import { SerializeAddon } from "@xterm/addon-serialize"
import { Emulator, EmulatorState, CommandMapping, defaultCommandMapping, OutputFactory, FileSystem, DirOp, FileOp, EnvironmentVariables, OptionParser } from "javascript-terminal"
import chalk from "chalk"

import { CONTENT, ContentImageItemRecord, ContentImageLineRecord, ContentItemGroupRecord, ContentLineGroupRecord, ContentLinkItemRecord, ContentTextLineRecord } from "@/data/content"
import { usePrefersColorScheme } from "@/utils/use-prefers-color-scheme"
import { router } from "@/app/router"

const URL_REGEX = /((https?|HTTPS?):[/]{2}|\/)[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/g

const COMMAND_MAPPING = CommandMapping.create({
    ...defaultCommandMapping,
    help: {
        function(state, opts) {
            return { output: OutputFactory.makeTextOutput(
                "\n" +
                `这是 ${chalk.cyanBright.bold("SLIGHTNING")} 的主页的命令行版本，模拟了一个简单的命令行程序。你可以通过命令来浏览它，所有内容都在虚拟内存文件系统中。\n\n` +
                "所有命令：\n\n" +
                Array.from(COMMAND_MAPPING.keys()).map((command) => {
                    const help = COMMAND_HELP[command]
                    return " ".repeat(4) + (help === undefined ? command : command.padEnd(16) + help)
                }).join("\n")
            ) }
        },
        optDef: {}
    },
    open: {
        function(state: EmulatorState, opts) {
            const { argv } = OptionParser.parseOptions(opts, {})
            const filename = argv[0]
            if (filename === undefined) {
                return {}
            }
            const path = resolveCommandPath(state, filename)
            const fs = state.getFileSystem()
            const { err, file } = FileOp.readFile(fs,  path)
            if (err) {
                return { output: OutputFactory.makeErrorOutput(err) }
            }
            const links = file.get("content").match(URL_REGEX)
            if (links === null) {
                return { output: OutputFactory.makeErrorOutput({ source: "open", type: "该文件中没有链接" }) }
            }
            for (const link of links) {
                if (link.split("/").pop()?.includes(".")) {
                    open(link, "_blank")
                } else if (link.startsWith("https:")) {
                    const url = new URL(link, location.href)
                    open(url, undefined, "popup,width=400,height=600")
                } else if (link.startsWith("/")) {
                    router.push(link)
                } else {
                    open(link, "_blank")
                }
            }
            return { output: OutputFactory.makeTextOutput("打开链接：" + link) }
        },
        optDef: {}
    },
    tree: {
        function(state: EmulatorState, opts) {
            const { argv } = OptionParser.parseOptions(opts, {})
            const path = resolveCommandPath(state, argv[0])
            const fs = state.getFileSystem()
            function getOutput(path: string) {
                const fileResult = DirOp.listDirectoryFiles(fs, path)
                if (fileResult.err) {
                    throw fileResult.err
                }
                const folderResult = DirOp.listDirectoryFolders(fs, path)
                if (folderResult.err) {
                    throw folderResult.err
                }
                const list = [...fileResult.list, ...folderResult.list]
                const last = list.pop()
                let output = ""
                for (const name of list) {
                    output += "├─ " + name + "\n"
                    if (name.endsWith("/")) {
                        output += getOutput(resolvePath(path, name))
                            .split("\n").map(name => "│  " + name).join("\n") + "\n"
                    }
                }
                if (last !== undefined) {
                    const name = last
                    output += "╰─ " + name + "\n"
                    if (name.endsWith("/")) {
                        output += getOutput(resolvePath(path, name))
                            .split("\n").map(name => "   " + name).join("\n") + "\n"
                    }
                }
                return output.trim()
            }
            try {
                let output = (path === "/" ? "/" : path + "/") + "\n" + getOutput(path)
                return { output: OutputFactory.makeTextOutput(output) }
            } catch (error) {
                return { output: OutputFactory.makeErrorOutput(error) }
            }
        },
        optDef: {}
    },
    treecat: {
        function(state: EmulatorState, opts) {            const { argv } = OptionParser.parseOptions(opts, {})
            const path = resolveCommandPath(state, argv[0])
            const fs = state.getFileSystem()
            function getOutput(path: string) {
                const fileResult = DirOp.listDirectoryFiles(fs, path)
                if (fileResult.err) {
                    throw fileResult.err
                }
                const folderResult = DirOp.listDirectoryFolders(fs, path)
                if (folderResult.err) {
                    throw folderResult.err
                }
                const list = [...fileResult.list, ...folderResult.list]
                const last = list.pop()
                let output = ""
                for (const name of list) {
                    const filepath = resolvePath(path, name)
                    output += "├─ " + name + "\n"
                    if (name.endsWith("/")) {
                        output += getOutput(filepath)
                            .split("\n").map(name => "│  " + name).join("\n") + "\n"
                    } else {
                        output += getFileContent(filepath)
                            .split("\n").map(name => "│    " + name).join("\n") + "\n"
                    }
                }
                if (last !== undefined) {
                    const name = last
                    const filepath = resolvePath(path, name)
                    output += "╰─ " + name + "\n"
                    if (name.endsWith("/")) {
                        output += getOutput(filepath)
                            .split("\n").map(name => "   " + name).join("\n") + "\n"
                    } else {
                        output += getFileContent(filepath)
                            .split("\n").map(name => "     " + name).join("\n") + "\n"
                    }
                }
                return output.trim()
            }
            function getFileContent(path: string): string {
                const { err, file } = FileOp.readFile(fs,  path)
                if (err) {
                    throw err
                }
                return file.get("content")
            }
            try {
                let output = (path === "/" ? "/" : path + "/") + "\n" + getOutput(path)
                return { output: OutputFactory.makeTextOutput(output) }
            } catch (error) {
                return { output: OutputFactory.makeErrorOutput(error) }
            }
        },
        optDef: {}
    },
    clear: {
        function(state, opts) {
            terminal.clear()
            return defaultCommandMapping.clear.function.call(this, state, opts)
        },
        optDef: {}
    },
    exit: {
        function(state, opts) {
            const lastRoute = router.currentRoute
            router.back()
            if (lastRoute === router.currentRoute) {
                close()
            }
            return { output: OutputFactory.makeTextOutput("正在退出……") }
        },
        optDef: {}
    }
})

function resolveCommandPath(state: EmulatorState, inputPath: string | undefined) {
    const cwd = state.getEnvVariables().get("cwd", "/")
    const targetPath = inputPath === undefined ? cwd : inputPath
    return resolvePath(cwd, targetPath)
}

function resolvePath(basepath: string, ...paths: string[]): string {
    let result = basepath.split(/[\\\/]/).filter(Boolean)
    for (const path of paths) {
        if (path.startsWith("/") || path.startsWith("\\")) {
            result = path.split(/[\\\/]/).filter(Boolean)
        } else {
            result.push(...path.split(/[\\\/]/).filter(Boolean))
        }
    }
    return "/" + result.join("/")
}

const COMMAND_HELP: Record<string, string> = {
    "cd": "切换工作目录",
    "help": "查看命令帮助",
    "exit": "退出",
    "ls": "列出文件",
    "open": "打开文件中的链接",
    "tree": "查个目录树",
    "treecat": "查看目录树及文件内容",
    "clear": "清空终端",
    "cat": "查看文件内容"
}

const LIGHT_THEME = {
    foreground: "#000000",
    background: "#FFFFFF80",
    cursor: "#000000",
    selectionBackground: "#BABABA80",
    black: "#FFFFFF",
    red: "#FF9B8C",
    green: "#60D959",
    yellow: "#DCB700",
    blue: "#97BAFF",
    magenta: "#B1B1FF",
    cyan: "#00D4D4",
    white: "#888888",
    brightBlack: "#E0E0E0",
    brightRed: "#E84738",
    brightGreen: "#20A41C",
    brightYellow: "#A28600",
    brightBlue: "#477FFF",
    brightMagenta: "#7E6FFF",
    brightCyan: "#009C9C",
    brightWhite: "#000000",
}

const FILE_SYSTEM = FileSystem.create((() => {
    const ROOT = "/home"
    const files: Record<string, unknown> = {}
    for (const area of CONTENT) {
        const { group } = area
        if (group instanceof ContentItemGroupRecord) {
            for (const content of group.contents) {
                if (content instanceof ContentLinkItemRecord) {
                    files[`${ROOT}/${area.key}/${content.key}`] = {
                        content: `${content.name} ${content.link}`,
                        canModify: false
                    }
                } else if (content instanceof ContentImageItemRecord) {
                    files[`${ROOT}/${area.key}/${content.key}`] = {
                        content: `${content.name} ${content.title} ${content.src} ${content.alt ?? ""}`,
                        canModify: false
                    }
                }
            }
        } else if (group instanceof ContentLineGroupRecord) {
            let lines: string[] = []
            for (const line of group.lines) {
                if (line instanceof ContentTextLineRecord) {
                    lines.push(line.text)
                } else if (line instanceof ContentImageLineRecord) {
                    lines.push(line.alt === undefined ? line.src : line.alt + " " + line.src)
                }
            }
            files[`${ROOT}/${area.key}`] = {
                content: lines.join("\n"),
                canModify: false
            }
        }
    }
    return files
})())

const TERMINAL_CONTENT_PATH = "/cli/terminal/content"
const EMULATOR_ENV_VARIABLES = "/cli/emulator/env_variables"

const terminalWrapperRef = useTemplateRef<HTMLDivElement>("terminal-wrapper")

const emulator = new Emulator()
let emulatorState = EmulatorState.create({
    commandMapping: COMMAND_MAPPING,
    fs: FILE_SYSTEM
})

const prefersColorScheme = usePrefersColorScheme()

const terminal = new Terminal({
    theme: prefersColorScheme.value === "light" ? LIGHT_THEME : undefined,
    cursorStyle: "bar"
})

const fitAddon = new FitAddon()
terminal.loadAddon(fitAddon)

const readline = new Readline()
terminal.loadAddon(readline)

terminal.loadAddon(new WebLinksAddon())

const serializeAddon = new SerializeAddon()
terminal.loadAddon(serializeAddon)

;(async () => {
    const terminalContent = localStorage.getItem(TERMINAL_CONTENT_PATH)
    terminal.writeln(
        terminalContent !== null ?
        `${terminalContent}\r\n\r\n${chalk.black.bgWhiteBright(" * ")}${chalk.black.bgBlueBright(" 还原的历史记录 ")}\r\n`:
        `欢迎访问 ${chalk.cyanBright.bold("SLIGHTNING")} 的主页！` +
        `使用 ${chalk.yellowBright("help")} 命令来查看使用帮助。`
    )
    const envVariablesString = localStorage.getItem(EMULATOR_ENV_VARIABLES)
    const envVariables = (() => {
        if (envVariablesString === null) {
            return null
        }
        try {
            return JSON.parse(envVariablesString)
        } catch (error) {
            console.error(error)
            return null
        }
    })()
    if (envVariables !== null) {
        emulatorState = emulatorState.setEnvVariables(EnvironmentVariables.create(envVariables))
    }
    while (true) {
        const cwd = emulatorState.getEnvVariables().get("cwd", "/")
        const command = await readline.read(
            `${chalk.yellowBright("[")}${chalk.magentaBright("root")}@${chalk.greenBright(location.host)} ${cwd}${chalk.yellowBright("]")}# `)
        if (command.trim() === "") {
            continue
        }
        const lastOutputSize = emulatorState.getOutputs().size
        emulatorState = emulator.execute(emulatorState, command)
        for (const output of emulatorState.getOutputs().slice(lastOutputSize)) {
            const { type, content } = output
            if (typeof content !== "string") {
                console.log("output object", output.toObject())
                continue
            }
            let processedContent = content.replace(/\n/g, "\r\n")
            switch (type) {
                case "TEXT_ERROR_OUTPUT":
                    processedContent = chalk.redBright.bold(processedContent)
            }
            terminal.writeln(processedContent)
        }
        saveState()
    }
})()

let lastFitHandle: ReturnType<typeof setTimeout> | null = null
function fit() {
    if (lastFitHandle !== null) {
        clearTimeout(lastFitHandle)
    }
    lastFitHandle = setTimeout(() => {
        fitAddon.fit()
    }, 600)
}

watchEffect(() => {
    const terminalWrapper = terminalWrapperRef.value
    if (terminalWrapper === null || terminalWrapper === undefined) {
        return
    }
    terminal.open(terminalWrapper)
})

function saveState() {
    const terminalContent = serializeAddon.serialize()
    localStorage.setItem(TERMINAL_CONTENT_PATH, terminalContent)
    const envVariables = emulatorState.getEnvVariables().toJSON()
    localStorage.setItem(EMULATOR_ENV_VARIABLES, JSON.stringify(envVariables))
}

onMounted(() => {
    setTimeout(() => {
        fitAddon.fit()
    }, 0)
    addEventListener("beforeunload", saveState)
    addEventListener("resize", fit)
})
onUnmounted(() => {
    saveState()
    removeEventListener("beforeunload", saveState)
    removeEventListener("resize", fit)
})

</script>

<template>
    <div ref="terminal-wrapper" class="terminal-wrapper"></div>
</template>

<style>
.xterm-viewport {
    background: none !important;
}
</style>

<style scoped>

.terminal-wrapper {
    height: 0;
    flex-grow: 1;
    overflow: hidden;
}

.terminal-wrapper * {
    transition: none;
}

</style>
