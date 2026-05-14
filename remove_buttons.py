import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove all Pedir buttons
content = re.sub(r'\s+<button class="item-order" onclick="addToast\([^)]+\)">Pedir</button>', '', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('✓ Botões Pedir removidos com sucesso')
