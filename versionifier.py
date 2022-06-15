import os
import requests
import json
import zipfile
import shutil

startCss = '<link rel="stylesheet" href="styles.css">'
def createEntry(name, desc, loc):
    return f'''\n<a href="{loc}" class="outerLink">
    <div class="container right">
        <div class="content">
            <h2>{name}</h2>
            <p class="versionsName">{desc}</p>
        </div>
    </div>
</a>'''

# outdir = "build/versions/"
outdir = "versions/"
def getReleases(repoName='oliverw10/ipt-portfolio'):
    # reponame as username/repo
    response = requests.get(f"https://api.github.com/repos/{repoName}/releases")
    return json.loads(response.text)

if __name__ == "__main__":
    releases = getReleases()

    if os.path.exists(outdir):
        shutil.rmtree(outdir)
    os.mkdir(outdir)

    for release in releases:
        print(release["tag_name"])
        print(release["name"])
        release["outDir"] = f"{outdir}{release['tag_name']}"

        with open("temp.zip", "wb+") as f: # download version files (as zip)
            file = requests.get(release["zipball_url"], stream=True)
            for data in file.iter_content():
                f.write(data)

        with zipfile.ZipFile("temp.zip", "r") as zip_ref: # extract
            zip_ref.extractall(release["outDir"])
        
        innerFile = f'{release["outDir"]}/{os.listdir(release["outDir"])[0]}/'
        for file in os.listdir(innerFile):
            shutil.move(f'{innerFile}/{file}', release["outDir"])
        os.rmdir(innerFile)
        
        os.remove("temp.zip")

    with open(f"{outdir}../versions.html", "w+") as f:
        f.write(startCss)
        for ver in releases:
            f.write(createEntry(ver["tag_name"], ver["name"], f"versions/{ver['tag_name']}"))