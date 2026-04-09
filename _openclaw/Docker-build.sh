#cd /Users/hamania/GitHub/hamania/eMala/_openclaw && docker build --no-cache -t openclaw:v22 . 2>&1 | tail -50
#docker build -t openclaw:v22 .

docker run --rm openclaw:v22 node /app/openclaw.mjs gateway --help 2>&1 | head -20
