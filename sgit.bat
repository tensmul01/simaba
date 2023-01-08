@echo off
rem echo "# simaba" >> README.md
git init
git add *
git commit -m %1
git branch -M main
git remote add origin https://github.com/tensmul01/simaba.git
git push -u origin main
echo pass:#Selamat001#