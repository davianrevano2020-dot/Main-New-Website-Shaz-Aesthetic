with open("app/components/GlobalHeader.tsx", "r") as f:
    content = f.read()

content = content.replace("url: '/#reviews'", "url: '/reviews'")

with open("app/components/GlobalHeader.tsx", "w") as f:
    f.write(content)
print("done")
