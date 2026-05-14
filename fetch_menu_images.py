"""
Script para buscar imagens de alta qualidade da Unsplash para cada item do cardápio
e atualizar o arquivo HTML
"""

import re

# Mapeamento de itens do cardápio para buscas e IDs de foto da Unsplash
menu_images = {
    "Batata Frita": "1613919113640",
    "Batata Porteña": "L1ltnmBlA14",
    "Batata Provençal": "mD79iyWlGzU",
    "Bolinho de Bacalhau": "bolinho_bacalhau",  # Local
    "Bolinho de Macaxeira": "bolo_macaxeira",  # Local
    "Bolinho de Queijo Gouda": "1625336405849",
    "Medalhão de Frango": "kcA-c3f_3FE",
    "Bolinho de Peperoni": "1611903627640",
    "Caldinho de Feijão": "1561181286399",
    "Caldinho de Vaca Atolada": "1561181286399",
    "Caldinho de Camarão": "1549988944-e4cedbfb93d0",
    "Camarão Acebolado": "1549988944-e4cedbfb93d0",
    "Kibe de Queijo": "1625336405849",
    "Kibe de Carne": "1625336405849",
    "Dados de Tapioca": "1625336405849",
    "Coração Acebolado": "kcA-c3f_3FE",
    "Porção de Coxinhas": "1625336405849",
    "Porção de Pastéis de Carne": "1611903627640",
    "Porção de Pastéis de Frango": "1611903627640",
    "Filé com Fritas": "UC0HZdUitWY",
    "Isca de Frango com Batata": "UC0HZdUitWY",
    "Empanada Caprese": "UC0HZdUitWY",
    "Empanada de Carne": "UC0HZdUitWY",
    "Empanada de Camarão": "UC0HZdUitWY",
    "Empanada de Frango": "UC0HZdUitWY",
    "Empanada Vegana": "UC0HZdUitWY",
    "Milanesa Caprese": "UC0HZdUitWY",
    "Milanesa Fugazzeta": "UC0HZdUitWY",
    "Milanesa Napolitana": "UC0HZdUitWY",
    "Hambúrguer Artesanal": "1568901346375",
    "Hambúrguer de Frango": "1568901346375",
    "Gin Tonic": "1553531768",
    "Brahma": "1571613316887",
    "Refrigerante": "1553531768",
    "Absinto": "1553531768",
    "Brownie Porteño": "1625336405849",
    "Cerveja Artesanal": "1571613316887",
}

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Atualizar cada item do menu com imagem correspondente
for item_name, photo_id in menu_images.items():
    # Criar padrão para encontrar o item no HTML
    pattern = f'<div class="item-name">{re.escape(item_name)}</div>'
    
    if pattern in content:
        # Encontrar o <img> anterior mais próximo deste item-name
        # Vamos encontrar a div menu-item que contém este item-name
        item_start = content.find(pattern)
        if item_start > -1:
            # Encontrar o início da menu-item antes deste item-name
            menu_item_start = content.rfind('<div class="menu-item', 0, item_start)
            
            if menu_item_start > -1:
                # Encontrar a primeira tag <img após o início da menu-item
                img_start = content.find('<img', menu_item_start)
                img_end = content.find('>', img_start) + 1
                
                if img_start > -1 and img_start < item_start:  # Garantir que é a img do item certo
                    old_img = content[img_start:img_end]
                    
                    # Construir URL da imagem
                    if photo_id.startswith('/'):  # Local
                        new_img = f'<img src="{photo_id}" alt="{item_name}">'
                    else:
                        new_img = f'<img src="https://images.unsplash.com/photo-{photo_id}?w=300&h=200&fit=crop" alt="{item_name}">'
                    
                    content = content[:img_start] + new_img + content[img_end:]
                    print(f"✓ {item_name}: Atualizado")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✓ Todas as imagens foram atualiza das!")
