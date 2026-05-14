---
name: my-workflow
description: Execute the "my-workflow" workflow. This skill guides through a structured workflow with defined steps and decision points.
---

# my-workflow

## Workflow Diagram

```mermaid
flowchart TD
    start_node_default([Start])
    end_node_default([End])
    prompt_1771516440722[Enter your prompt here.]
    ifelse_1771516472207{If/Else:<br/>Conditional Branch}

    start_node_default --> prompt_1771516440722
    prompt_1771516440722 --> ifelse_1771516472207
    ifelse_1771516472207 -->|True| end_node_default
    ifelse_1771516472207 -->|False| end_node_default
```

## Execution Instructions

## Workflow Execution Guide

Follow the Mermaid flowchart above to execute the workflow. Each node type has specific execution methods as described below.

### Execution Methods by Node Type

- **Rectangle nodes**: Execute Sub-Agents using the Task tool
- **Diamond nodes (AskUserQuestion:...)**: Use the AskUserQuestion tool to prompt the user and branch based on their response
- **Diamond nodes (Branch/Switch:...)**: Automatically branch based on the results of previous processing (see details section)
- **Rectangle nodes (Prompt nodes)**: Execute the prompts described in the details section below

### Prompt Node Details

#### prompt_1771516440722(Enter your prompt here.)

```
Enter your prompt here.

You can use variables like {{variableName}}.
```

### If/Else Node Details

#### ifelse_1771516472207(Binary Branch (True/False))

**Branch conditions:**
- **True**: When condition is true
- **False**: When condition is false

**Execution method**: Evaluate the results of the previous processing and automatically select the appropriate branch based on the conditions above.
