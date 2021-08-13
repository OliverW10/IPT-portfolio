import os
import shutil

if os.path.exists("build"): # if build exists
    shutil.rmtree('build') # delete it, to remove any contents
os.mkdir("build") # and create it again

shutil.copy("index.html", "build/index.html")
shutil.copytree("images", "build/images")

