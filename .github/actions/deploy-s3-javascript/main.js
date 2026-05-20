import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from '@actions/exec'

function run() {
    core.notice('Hello from my JavaScript Action!')
}

run();