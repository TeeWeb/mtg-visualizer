from mtgsdk import Card

synergy_report_template = {
    "synergy_score": None,
    "cards": None,
    "color_identities": None,
    "keyword_abilities": None
}

class CalculatedSynergy():
    def __init__(self, id_a, id_b):
        self.card_a = Card.find(id_a)
        self.card_b = Card.find(id_b)

    def calc_colors(self):
        clr_synergy = 0
        a_clrs = self.card_a.colors
        b_clrs = self.card_b.colors
        print(a_clrs, b_clrs)
        if len(a_clrs) > 0 and len(b_clrs) > 0:
            for color in a_clrs:
                if color in b_clrs:
                    clr_synergy += 1
        else:
            clr_synergy = 1
            
        return clr_synergy

    def calc_keyword_abilities(self):
        abil_synergy = 0
        print(self.card_a.text)
        return abil_synergy

    def create_synergy_report(self):
        print(self.card_a)
        report = synergy_report_template
        report["cards"] = [self.card_a.name, self.card_b.name]
        report["color_identities"] = self.calc_colors()
        report["keyword_abilities"] = self.calc_keyword_abilities()
        
        report["synergy_score"] = self.calculate_synergy(report)
        return report

    # Calculate synergy of cardB with cardA
    def calculate_synergy(self, report): 
        if self.card_a.name == self.card_b.name:
            return {
                "synergy_score": 100,
                "name": self.card_a.name
            }
        syn_score = report["color_identities"] + report["keyword_abilities"] 
        return syn_score

# synergy = CalculatedSynergy(str(439687), str(129466))
# print(synergy.create_synergy_report())