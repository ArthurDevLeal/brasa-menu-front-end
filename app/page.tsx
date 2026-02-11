"use client";

import {
  CTA,
  CTAActions,
  CTADescription,
  CTATitle,
  FeatureCard,
  Features,
  FeaturesGrid,
  FeaturesHeader,
  Footer,
  FooterBottom,
  FooterColumn,
  FooterColumns,
  FooterCopyright,
  FooterDescription,
  FooterList,
  FooterListItem,
  FooterLogo,
  FooterSocial,
  FormActions,
  FormField,
  FormRowTwoColumns,
  FormTextArea,
  Header,
  HeaderActions,
  HeaderLogo,
  Hero,
  HeroContent,
  HeroCtas,
  HeroDescription,
  HeroTitle,
  HowToCreate,
  HowToCreateContainer,
  HowToCreateForm,
  HowToCreateHeader,
  HowToCreateImage,
  ImagePlaceholder,
} from "@/components/land-page";
import { BarChart3, Clock, Palette, QrCode } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Clock,
      title: "Gestão em Tempo Real",
      description:
        "Controle pedidos da cozinha, salão e delivery instantaneamente. Nunca mais perca um pedido.",
    },
    {
      icon: QrCode,
      title: "Cardápio QR Code",
      description: "Gere códigos QR para seus clientes. Seus clientes podem especificar a garçom.",
    },
    {
      icon: BarChart3,
      title: "Analytics Avançado",
      description: "Descubra quais pratos vendem mais e identifique os horários de pico.",
    },
    {
      icon: Palette,
      title: "Personalização Total",
      description: "Deixe o cardápio com a cara de sua marca. Escolha cores, fontes e imagens.",
    },
  ];

  const footerProductLinks = [
    { href: "#", label: "Cardápio Digital" },
    { href: "#", label: "Gestão de Pedidos" },
    { href: "#", label: "Integrações" },
    { href: "#", label: "Preços" },
  ];

  const footerCompanyLinks = [
    { href: "#", label: "Sobre Nós" },
    { href: "#", label: "Carreiras" },
    { href: "#", label: "Blog" },
    { href: "#", label: "Contato" },
  ];

  const footerLegalLinks = [
    { href: "#", label: "Termos de Uso" },
    { href: "#", label: "Privacidade" },
    { href: "#", label: "Cookies" },
  ];

  const socialLinks = [
    {
      href: "#",
      label: "Facebook",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "YouTube",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Instagram",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.398.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <HeaderLogo />
        <HeaderActions />
      </Header>

      <Hero>
        <HeroContent>
          <HeroTitle>
            Transforme seu Restaurante em uma <br/> <span className="text-primary">Máquina de Vendas Digital</span>
          </HeroTitle>
          <HeroDescription>
            Gerencie pedidos, atualize cardápios em tempo real e analise o desempenho <br/> do seu negócio com nossa
            plataforma tudo-em-um.
          </HeroDescription>
          <HeroCtas primaryText="Começar Gratuitamente" secondaryText="Ver Demonstração" />
        </HeroContent>
      </Hero>

      <Features>
        <FeaturesHeader subtitle="Tudo o que você precisa" title="Recursos Poderosos para seu Restaurante" />
        <FeaturesGrid>
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </FeaturesGrid>
      </Features>

      <HowToCreate>
        <HowToCreateHeader
          title="Tão simples quanto cozinhar"
          subtitle="Adicionar novos pratos ao seu cardápio leva menos de 30 segundos."
        />
        <HowToCreateContainer>
          <HowToCreateForm>
            <FormField label="Nome do Prato" value="Hambúrguer Artesanal" />
            <FormRowTwoColumns>
              <FormField label="Preço (R$)" value="32.80" />
              <FormField label="Categoria" value="Burgers" />
            </FormRowTwoColumns>
            <FormTextArea
              label="Descrição"
              value="Bife de carne bovina 150g, queijo cheddar, bacon crocante e molho especial no pão brioche."
            />
            <FormActions />
          </HowToCreateForm>

          <HowToCreateImage>
            <ImagePlaceholder text="JPG do Prato" label="Imagem do Produto" />
          </HowToCreateImage>
        </HowToCreateContainer>
      </HowToCreate>

      <CTA>
        <CTATitle>Pronto para revolucionar seu negócio?</CTATitle>
        <CTADescription>
          Junte-se a mais de 500 restaurantes que modernizaram seu atendimento e aumentaram o faturamento em
          média 30%.
        </CTADescription>
        <CTAActions primaryText="Criar Conta Gratis" secondaryText="Falar com Especialista" />
      </CTA>

      <Footer>
        <FooterColumns>
          <FooterColumn>
            <FooterLogo />
            <FooterDescription>
              Tecnologia que serve seu negócio. Feita para empreendedores da gastronomia.
            </FooterDescription>
          </FooterColumn>

          <FooterColumn title="Produto">
            <FooterList>
              {footerProductLinks.map((link, i) => (
                <FooterListItem key={i} href={link.href}>
                  {link.label}
                </FooterListItem>
              ))}
            </FooterList>
          </FooterColumn>

          <FooterColumn title="Empresa">
            <FooterList>
              {footerCompanyLinks.map((link, i) => (
                <FooterListItem key={i} href={link.href}>
                  {link.label}
                </FooterListItem>
              ))}
            </FooterList>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterList>
              {footerLegalLinks.map((link, i) => (
                <FooterListItem key={i} href={link.href}>
                  {link.label}
                </FooterListItem>
              ))}
            </FooterList>
          </FooterColumn>
        </FooterColumns>

        <FooterBottom>
          <FooterCopyright text="© 2025 Restaurante Front-end. Todos os direitos reservados." />
          <FooterSocial links={socialLinks} />
        </FooterBottom>
      </Footer>
    </div>
  );
}
