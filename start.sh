cd backend/LearningAPI
git checkout remotes/origin/release
git pull origin release
python3 app.py & echo $! > app_pid.txt
cd ..
cd ..
cd frondend/LearningUI
git checkout remotes/origin/release
git pull origin release
npm run start-server
