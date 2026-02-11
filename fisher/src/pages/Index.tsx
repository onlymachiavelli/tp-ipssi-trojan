import { Trophy, Download, CheckCircle, GraduationCap, Shield, Code, Brain } from "lucide-react";
import heroCelebration from "@/assets/hero-celebration.jpg";

const ConfettiPiece = ({ delay, left, color }: { delay: number; left: string; color: string }) => (
  <div
    className="absolute w-2 h-2 rounded-sm animate-confetti opacity-80"
    style={{
      left,
      top: "-10px",
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      backgroundColor: color,
    }}
  />
);

const confettiColors = [
  "hsl(82, 85%, 55%)",
  "hsl(45, 100%, 60%)",
  "hsl(200, 80%, 60%)",
  "hsl(82, 85%, 70%)",
  "hsl(0, 0%, 90%)",
];

const Index = () => {
  const handleDownload = () => {
    // Create a dummy file for download
    const content = `
==============================================
  IPSSI - FORMULAIRE DE CANDIDATURE
  Bourse d'études gratuite - 1 an
==============================================

Félicitations ! Vous avez été sélectionné(e) pour bénéficier 
d'une année d'études gratuite à l'IPSSI.

Pour finaliser votre inscription, veuillez remplir les 
informations suivantes et renvoyer ce fichier à :
candidature@ipssi-scholarship.com

----------------------------------------------
INFORMATIONS PERSONNELLES
----------------------------------------------

Nom : ___________________________________
Prénom : ________________________________
Date de naissance : ______________________
Adresse : _______________________________
Code postal : ___________________________
Ville : _________________________________
Téléphone : _____________________________
Email : _________________________________

----------------------------------------------
PARCOURS ACADÉMIQUE
----------------------------------------------

Dernier diplôme obtenu : _________________
Établissement : _________________________
Année d'obtention : _____________________
Spécialité souhaitée :
  [ ] Cybersécurité
  [ ] Intelligence Artificielle
  [ ] Développement Web & Mobile
  [ ] Data Science

----------------------------------------------
MOTIVATION
----------------------------------------------

Décrivez en quelques lignes pourquoi vous souhaitez 
rejoindre l'IPSSI :

__________________________________________________
__________________________________________________
__________________________________________________
__________________________________________________

----------------------------------------------

Renvoyez ce formulaire complété à :
candidature@ipssi-scholarship.com

Un de nos agents vous contactera sous 48h.

© IPSSI - École d'informatique, IA & Cybersécurité
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "IPSSI_Formulaire_Candidature.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Confetti */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiPiece
            key={i}
            delay={i * 0.2}
            left={`${Math.random() * 100}%`}
            color={confettiColors[i % confettiColors.length]}
          />
        ))}
      </div>

      {/* Top Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 px-4 text-center">
        <p className="text-sm font-medium text-primary">
          🔥 Offre exclusive — Bourse d'études 100% gratuite pendant 1 an !
        </p>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight text-foreground">.IPSSI</span>
        </div>
        <button
          onClick={handleDownload}
          className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          CANDIDATURE
        </button>
      </header>

      {/* Hero Section */}
      <main className="relative">
        <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 pb-16 md:pt-16 md:pb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Trophy className="w-4 h-4" />
                Félicitations !
              </div>

              <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
                Vous avez gagné{" "}
                <span className="text-gradient-primary glow-text">1 an d'études gratuites</span>{" "}
                à l'IPSSI !
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                Vous avez été sélectionné(e) pour bénéficier d'une <strong className="text-foreground">bourse complète</strong> couvrant une année de formation en Cybersécurité, IA ou Développement.
              </p>

              {/* CTA */}
              <button
                onClick={handleDownload}
                className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg animate-pulse-glow transition-all hover:scale-105"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                Télécharger le formulaire
              </button>
              <p className="text-muted-foreground text-sm mt-3">
                Remplissez le formulaire et un de nos agents vous contactera sous 48h.
              </p>
            </div>

            {/* Right - Hero Image */}
            <div className="animate-scale-in relative">
              <div className="relative rounded-2xl overflow-hidden glow-primary">
                <img
                  src={heroCelebration}
                  alt="Célébration de la bourse IPSSI"
                  className="w-full h-auto rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="bg-card/50 border-y border-border py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Comment <span className="text-gradient-primary">récupérer votre bourse</span> ?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  icon: Download,
                  title: "Téléchargez le fichier",
                  desc: "Cliquez sur le bouton ci-dessus pour télécharger le formulaire de candidature.",
                },
                {
                  step: "02",
                  icon: CheckCircle,
                  title: "Remplissez vos infos",
                  desc: "Complétez le formulaire avec vos informations personnelles et académiques.",
                },
                {
                  step: "03",
                  icon: GraduationCap,
                  title: "Un agent vous contacte",
                  desc: "Envoyez le formulaire et un de nos agents vous recontactera sous 48h.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-secondary/50 border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
                >
                  <span className="text-5xl font-black text-primary/20 group-hover:text-primary/40 transition-colors">
                    {item.step}
                  </span>
                  <item.icon className="w-8 h-8 text-primary mt-4 mb-3" />
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-16 md:py-20">
          <div className="max-w-5xl mx-auto px-6 md:px-12">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Nos filières <span className="text-gradient-primary">d'excellence</span>
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              70% de pratique. 100% d'ambition. Choisissez votre spécialité.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Shield,
                  title: "Cybersécurité",
                  desc: "Protégez les systèmes d'information et devenez expert en sécurité informatique.",
                },
                {
                  icon: Brain,
                  title: "Intelligence Artificielle",
                  desc: "Maîtrisez le machine learning, le deep learning et les applications de l'IA.",
                },
                {
                  icon: Code,
                  title: "Développement",
                  desc: "Créez des applications web et mobiles avec les technologies les plus demandées.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
            <GraduationCap className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Ne laissez pas passer cette chance !
            </h2>
            <p className="text-muted-foreground mb-8">
              Cette offre est limitée. Téléchargez le formulaire maintenant et commencez votre nouvelle carrière dans le numérique.
            </p>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-10 py-4 rounded-xl font-bold text-lg animate-pulse-glow transition-all hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Réclamer ma bourse
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xl font-black">.IPSSI</span>
          <p className="text-muted-foreground text-sm">
            © 2026 IPSSI — La grande école d'informatique, IA et Cybersécurité
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
