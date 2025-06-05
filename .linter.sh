#!/bin/bash
cd /home/kavia/workspace/code-generation/chatease-31040-afda11b9/chat_ease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

