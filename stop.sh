cd backend/LearningAPI
if [ -f "app_pid.txt" ]; then
    pid=$(cat app_pid.txt)
    echo "Killing process with PID: $pid"
    kill $pid
    rm app_pid.txt
else
    echo "No PID file found. The process may not be running."
fi
cd ..
cd ..
cd frondend/LearningUI
npm run stop-server