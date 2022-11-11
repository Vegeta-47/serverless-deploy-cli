echo "Echo from sh"


# changeVersionNumber(){
#     case $2 in
#         "major")
#             node changeVersion.js $1 0
#         ;;
#         "minor")
#             node changeVersion.js $1 1
#         ;;
#         "patch")
#             node changeVersion.js $1 2
#         ;;
#         *)
#         ;;
#     esac
# }



# if [ $1 = "prod" ]; then
#     echo "deploying to Production"
#     changeVersionNumber 1 $2
    

    
#     git add .
#     git commit -m "updated version number after deploy to prod"
#     git push origin master
# fi
# if [ $1 = "stage" ]; then
#     echo "deploying to Stage"
#     changeVersionNumber 1 $2

#     # git add .
#     # git commit -m "updated version number after deploy to prod"
#     # git push origin master
# fi
# if [ $1 = "development" ]; then
#     echo "deploying to Development (inffdev.com)"

#     $2

#     git add .
#     git commit -m "updated version number after deploy to inffdev"
#     git push origin v2.8
# fi

# # if [ $1 = "qa" ]; then
# #     echo "deploying to Development (inffqa.com)"
# #     changeVersionNumber 0 $2
# #     export NODE_OPTIONS=--max-old-space-size=8192
# #     yarn build-qa
# #     cp ./robots.txt ./dist/
# #     cp ./src/manifest.json ./dist/
# #     cp ./src/favicon.ico ./dist/
# #     cp ./src/favicon512.png ./dist/
# #     cp ./src/service-worker.js ./dist/
# #     aws s3 sync --acl public-read --sse --delete dist s3://inffqa.com/ --profile inffdev && aws cloudfront create-invalidation --distribution-id EN55DV1XO72V3 --paths "/*" --profile inffdev
# #     git add .
# #     git commit -m "updated version number after deploy to inffqa"
# #     git push origin newPlatform
# # fi

