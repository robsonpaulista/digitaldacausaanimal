import { ArrowLeft } from 'lucide-react';
import { CONTACT } from '../data/content';
import './PrivacyPolicy.css';

const UPDATED_AT = '14 de outubro de 2026';
const META_PRIVACY_URL = 'https://www.facebook.com/privacy/policy';
const ANPD_URL = 'https://www.gov.br/anpd';

export function PrivacyPolicy() {
  return (
    <>
      <header className="privacy__header">
        <div className="container privacy__header-inner">
          <a href="/" className="privacy__brand" aria-label="Voltar para a página inicial">
            <img src="/images/logo-pacto.png" alt="" width={385} height={296} />
            <span aria-hidden="true" />
            <img src="/images/logo-digital.png" alt="" width={329} height={360} />
          </a>
          <a href="/" className="btn btn--ghost-light privacy__back">
            <ArrowLeft strokeWidth={2.4} />
            Voltar ao site
          </a>
        </div>
      </header>

      <main className="container privacy">
        <h1 className="title-lg">Política de Privacidade</h1>
        <p className="privacy__updated">Atualizada em {UPDATED_AT}.</p>

        <section>
          <h2>1. Quem somos</h2>
          <p>
            O site <strong>digitaldacausaanimal.com.br</strong> é um canal informativo da Digital da Causa Animal sobre
            o Pacto pelos Animais e o Busão da Castração no Piauí. Para qualquer assunto sobre privacidade e dados
            pessoais, fale com a gente pelo e-mail <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </section>

        <section>
          <h2>2. Dados que você informa no formulário</h2>
          <p>
            No formulário do canal do WhatsApp você informa nome, WhatsApp, cidade, bairro e, se quiser, uma mensagem.
            <strong> O site não grava esses dados.</strong> Eles servem só para montar uma mensagem que é aberta no seu
            WhatsApp e só chegam à nossa equipe se você decidir enviá-la. A partir daí, o tratamento também segue a
            política do WhatsApp.
          </p>
        </section>

        <section>
          <h2>3. Localização (opcional)</h2>
          <p>
            Se você tocar em “Usar localização”, o navegador pede a sua permissão. A posição é arredondada (cerca de
            110 metros) e enviada ao serviço OpenStreetMap apenas para descobrir sua cidade e seu bairro. Não guardamos
            essa informação.
          </p>
        </section>

        <section>
          <h2>4. Serviços de terceiros usados pelo site</h2>
          <ul>
            <li>
              <strong>Vercel</strong> (hospedagem): registra dados técnicos de acesso, como endereço IP, navegador e
              página acessada, para segurança e funcionamento do site.
            </li>
            <li>
              <strong>IBGE</strong>: fornece a lista de municípios do Piauí usada no formulário.
            </li>
            <li>
              <strong>Instagram (Meta)</strong>: as miniaturas das nossas publicações são carregadas dos servidores da
              Meta, que recebem dados técnicos de acesso, como endereço IP e navegador.
            </li>
          </ul>
        </section>

        <section>
          <h2>5. Cookies e Pixel da Meta</h2>
          <p>
            Só usamos o Pixel da Meta <strong>se você permitir</strong> no aviso de cookies. Com ele, medimos as visitas,
            entendemos quais conteúdos interessam mais e podemos mostrar conteúdos da causa animal no Facebook e no
            Instagram para quem visitou o site.
          </p>
          <ul>
            <li>
              <strong>O que é coletado:</strong> páginas visitadas, ações como clicar no WhatsApp ou enviar o
              formulário, identificadores de cookie (como o <code>_fbp</code>), endereço IP e navegador.
            </li>
            <li>
              <strong>O que não é coletado:</strong> nome, telefone, cidade, bairro ou qualquer texto que você digita no
              site.
            </li>
            <li>
              <strong>Base legal:</strong> o seu consentimento (art. 7º, I, da LGPD). A Meta trata esses dados conforme a{' '}
              <a href={META_PRIVACY_URL} target="_blank" rel="noopener noreferrer">
                política de privacidade dela
              </a>
              .
            </li>
            <li>
              <strong>Como mudar sua escolha:</strong> use “Preferências de cookies”, no rodapé do site. Se você recusar,
              os cookies do Pixel são apagados. No seu navegador fica guardada apenas a sua escolha.
            </li>
          </ul>
        </section>

        <section>
          <h2>6. Seus direitos</h2>
          <p>
            Pela LGPD (art. 18), você pode pedir a confirmação e o acesso aos seus dados, a correção, a anonimização ou a
            eliminação, informações sobre compartilhamento e a revogação do consentimento a qualquer momento. Basta
            escrever para <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. Você também pode procurar a{' '}
            <a href={ANPD_URL} target="_blank" rel="noopener noreferrer">
              Autoridade Nacional de Proteção de Dados (ANPD)
            </a>
            .
          </p>
        </section>

        <section>
          <h2>7. Segurança</h2>
          <p>
            O site funciona só com conexão segura (HTTPS), restringe os serviços externos que podem ser carregados e não
            mantém banco de dados de visitantes.
          </p>
        </section>

        <section>
          <h2>8. Mudanças nesta política</h2>
          <p>Se esta política mudar, a nova versão será publicada nesta página com a data de atualização.</p>
        </section>
      </main>

      <footer className="privacy__footer">
        <div className="container">© {new Date().getFullYear()} Digital da Causa Animal</div>
      </footer>
    </>
  );
}
