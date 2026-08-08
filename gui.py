import os

def add_style(text):
    faded = ""
    red = 56
    green = 226
    blue = 247
    speed = (-20, 20, 0)
    for line in text.splitlines():
        faded += (f"\033[38;2;{red};{green};{blue}m{line}\033[0m\n")
        if red < 255:
            red -= speed[0]
            if red < 0: red = 0
            if red > 255: red = 255
        if green < 255:
            green -= speed[1]
            if green < 0: green = 0
            if green > 255: green = 255
        if blue < 255:
            blue -= speed[2]
            if blue < 0: blue = 0
            if blue > 255: blue = 255
    return faded

# ==========================================
#
# MENU
#
# ==========================================

banner = """
  ██████  ██▓███   ▄▄▄       ▄████▄  ▓█████    ▄▄▄█████▓ ▒█████   ▒█████   ██▓    
▒██    ▒ ▓██░  ██▒▒████▄    ▒██▀ ▀█  ▓█   ▀    ▓  ██▒ ▓▒▒██▒  ██▒▒██▒  ██▒▓██▒    
░ ▓██▄   ▓██░ ██▓▒▒██  ▀█▄  ▒▓█    ▄ ▒███      ▒ ▓██░ ▒░▒██░  ██▒▒██░  ██▒▒██░    
  ▒   ██▒▒██▄█▓▒ ▒░██▄▄▄▄██ ▒▓▓▄ ▄██▒▒▓█  ▄    ░ ▓██▓ ░ ▒██   ██░▒██   ██░▒██░    
▒██████▒▒▒██▒ ░  ░ ▓█   ▓██▒▒ ▓███▀ ░░▒████▒     ▒██▒ ░ ░ ████▓▒░░ ████▓▒░░██████▒
▒ ▒▓▒ ▒ ░▒▓▒░ ░  ░ ▒▒   ▓▒█░░ ░▒ ▒  ░░░ ▒░ ░     ▒ ░░   ░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▓  ░
░ ░▒  ░ ░░▒ ░       ▒   ▒▒ ░  ░  ▒    ░ ░  ░       ░      ░ ▒ ▒░   ░ ▒ ▒░ ░ ░ ▒  ░
░  ░  ░  ░░         ░   ▒   ░           ░        ░      ░ ░ ░ ▒  ░ ░ ░ ▒    ░ ░   
      ░                 ░  ░░ ░         ░  ░                ░ ░      ░ ░      ░  ░
                            ░                                                     
"""

panel = """
          ╔═══════════════════════════════════════════════════════════════╗
          ║ [0]. 000000000000000000000000 | [5]. 555555555555555555555555 ║
          ║ [1]. 111111111111111111111111 | [6]. 666666666666666666666666 ║
          ║ [2]. 222222222222222222222222 | [7]. 777777777777777777777777 ║
          ║ [3]. 333333333333333333333333 | [8]. 888888888888888888888888 ║
          ║ [4]. 444444444444444444444444 | [9]. 999999999999999999999999 ║
          ╚═══════════════════════════════════════════════════════════════╝
"""

class Panel:
    def __init__(self, options: dict, show_banner=False):
        self.options = options
        self.text = panel
        self.show_banner = show_banner
        
        for i, o in enumerate(options.keys()):
            space = " " * (24 - len(o))
            self.text = self.text.replace(f"{i}"*24, f"{o}{space}")
        
        for i in range(10):
            self.text = self.text.replace(f"{i}"*24, "None"+" "*20)
            
        self.text = add_style(self.text)
    
    def show(self):
        while True:
            os.system("cls")
            if self.show_banner: print(add_style(banner))
            print(self.text)
            try:
                i = int(input("> "))
                choice = self.options[list(self.options.keys())[i]]
                choice()
            except KeyboardInterrupt:
                break
            except Exception as e:
                print(e)
                input("Choose a integer value.")