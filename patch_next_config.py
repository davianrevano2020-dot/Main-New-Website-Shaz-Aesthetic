with open("next.config.mjs", "r") as f:
    content = f.read()

if "outputFileTracing: false" not in content:
    content = content.replace("eslint: {", "outputFileTracing: false,\n  eslint: {")
    with open("next.config.mjs", "w") as f:
        f.write(content)
