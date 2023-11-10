cd backend/LearningAPI
git checkout remotes/origin/develop
git pull
python3 app.py & echo $! > app_pid.txt
cd ..
cd ..
cd frondend/LearningUI
git checkout remotes/origin/release
git pull
npm run start-server
