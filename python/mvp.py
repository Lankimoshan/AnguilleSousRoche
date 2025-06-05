import random
import time
import sys

# Couleurs terminal (inutile mais marrant)
colors = [
    "\033[91m",  # Rouge
    "\033[92m",  # Vert
    "\033[93m",  # Jaune
    "\033[94m",  # Bleu
    "\033[95m",  # Magenta
    "\033[96m",  # Cyan
    "\033[97m",  # Blanc
]
RESET = "\033[0m"

fruits = ["Banane", "Pomme", "Poire", "Fraise", "Mangue", "Kiwi", "Ananas", "Pastèque"]

questions_existentielles = [
    "Pourquoi suis-je comestible ?",
    "Suis-je plus utile en smoothie ou en tarte ?",
    "Et si j’étais une banane ?",
    "Est-ce que le blender est mon destin ?",
    "Le pépin est-il mon âme ?",
    "Pourquoi les humains nous mangent-ils ?",
    "Peut-on vraiment éplucher la vérité ?",
    "Si je tombe d’un arbre et que personne ne regarde, ai-je mûri ?"
]

affirmations_stupides = [
    "J'ai vu une banane voler une fois.",
    "Je pense donc je mûris.",
    "Ma peau est plus profonde que ma chair.",
    "Le compost, c’est juste le paradis inversé.",
    "Les humains mettent du citron sur nous... pour quoi faire ?",
    "Je rêve d'être une pizza.",
    "Un jour, je serai confiture. Et j’en serai fier.",
    "La banane est un agent double."
]

# Fonction pour choisir une couleur aléatoire
def random_color():
    return random.choice(colors)

# Fonction de pause dramatique inutile
def dramatic_pause():
    time.sleep(random.uniform(0.3, 1.2))

# Fonction de log avec style
def fruit_say(fruit, phrase):
    color = random_color()
    print(f"{color}[{fruit}]: {phrase}{RESET}")
    dramatic_pause()

# Générateur de fruit pensif
def fruit_thinker(fruit):
    while True:
        action = random.choice(['question', 'affirmation', 'soupir', 'rire', 'rever'])
        if action == 'question':
            phrase = random.choice(questions_existentielles)
        elif action == 'affirmation':
            phrase = random.choice(affirmations_stupides)
        elif action == 'soupir':
            phrase = "*soupir fruité*"
        elif action == 'rire':
            phrase = "Ahahaha… Je me sens pulpeux aujourd’hui."
        elif action == 'rever':
            phrase = f"Et si j’étais un {random.choice(fruits)} ?"
        fruit_say(fruit, phrase)
        yield

# Simule une conversation stupide entre fruits
def start_fruit_conversation(cycles=50):
    thinkers = {fruit: fruit_thinker(fruit) for fruit in fruits}
    for _ in range(cycles):
        speaker = random.choice(fruits)
        next(thinkers[speaker])

# Fonction inutile mais longue pour ajouter des lignes
def inutilite_totale():
    compteur = 0
    while compteur < 50:
        data = ["🍌", "🍎", "🍐", "🍓", "🥭", "🥝", "🍍", "🍉"]
        random.shuffle(data)
        fruit = data[0]
        print(f"{random_color()}Analyse du fruit {fruit}... inutilement...{RESET}")
        time.sleep(0.1)
        compteur += 1

# Fonction d'erreur volontaire
def bug_à_la_con():
    try:
        print("Tentative d'ouvrir un fruit comme un fichier...")
        with open("Banane", "r") as f:
            content = f.read()
    except Exception as e:
        print(f"{random_color()}Erreur logique : {e}{RESET}")

# Une danse rituelle de fruit
def fruit_dance():
    danse = ["🍌", "🍎", "🍍", "🍓", "🍉"]
    for _ in range(10):
        line = " ".join(random.choices(danse, k=10))
        print(f"{random_color()}{line}{RESET}")
        time.sleep(0.2)

# Fonction principale
def main():
    print(f"{random_color()}Bienvenue dans le théâtre absurde des fruits pensants !{RESET}")
    dramatic_pause()
    inutilite_totale()
    dramatic_pause()
    fruit_dance()
    dramatic_pause()
    bug_à_la_con()
    dramatic_pause()
    start_fruit_conversation(cycles=80)
    print(f"{random_color()}Fin de la réflexion fruitière. Ou pas.{RESET}")

# Si on exécute le fichier, on lance le chaos
if __name__ == "__main__":
    main()
