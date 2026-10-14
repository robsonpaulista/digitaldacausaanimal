import { useId, useState, type ChangeEvent, type FormEvent } from 'react';
import { CircleCheck, LoaderCircle, LocateFixed, Radio } from 'lucide-react';
import { CONTACT } from '../data/content';
import { usePiauiCities } from '../hooks/usePiauiCities';
import { getCurrentCoords, reverseGeocode } from '../services/geolocation';
import { findCity } from '../services/ibge';
import { trackPixel } from '../services/metaPixel';
import {
  buildChannelSignupMessage,
  buildWhatsAppLink,
  formatPhone,
  isValidPhone,
  type ChannelSignup,
} from '../services/whatsapp';
import { BrazilFlag, WhatsAppIcon } from './icons';
import './ChannelSignupForm.css';

type Field = keyof ChannelSignup;
type FormErrors = Partial<Record<Field, string>>;
type LocateStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_FORM: ChannelSignup = {
  name: '',
  phone: '',
  city: '',
  neighborhood: '',
  message: '',
};

const MAX_LENGTH: Record<Exclude<Field, 'phone'>, number> = {
  name: 80,
  city: 60,
  neighborhood: 60,
  message: 300,
};

const LOCATE_LABEL: Record<LocateStatus, string> = {
  idle: 'Usar localização',
  loading: 'Localizando…',
  success: 'Localizado',
  error: 'Indisponível',
};

function validate(form: ChannelSignup, cities: string[]): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 3) errors.name = 'Informe seu nome completo';
  if (!isValidPhone(form.phone)) errors.phone = 'Informe um WhatsApp válido com DDD';
  if (!form.city.trim()) errors.city = 'Informe sua cidade';
  else if (cities.length && !findCity(cities, form.city)) errors.city = 'Escolha uma cidade do Piauí na lista';
  if (!form.neighborhood.trim()) errors.neighborhood = 'Informe seu bairro';
  return errors;
}

interface ChannelSignupFormProps {
  /** Versão enxuta (sem mensagem opcional) para espaços com altura limitada, como o carrossel do topo. */
  compact?: boolean;
}

export function ChannelSignupForm({ compact = false }: ChannelSignupFormProps) {
  const cities = usePiauiCities();
  const [form, setForm] = useState<ChannelSignup>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [locateStatus, setLocateStatus] = useState<LocateStatus>('idle');
  const [sent, setSent] = useState<boolean>(false);
  const citiesListId = useId();

  const handleChange = (field: Field) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'phone' ? formatPhone(event.target.value) : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleLocate = async () => {
    setLocateStatus('loading');
    try {
      const place = await reverseGeocode(await getCurrentCoords());
      setForm((current) => ({
        ...current,
        city: findCity(cities, place.city) ?? (place.city || current.city),
        neighborhood: place.neighborhood || current.neighborhood,
      }));
      setErrors((current) => ({ ...current, city: undefined, neighborhood: undefined }));
      setLocateStatus('success');
    } catch {
      setLocateStatus('error');
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form, cities);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    window.open(buildWhatsAppLink(buildChannelSignupMessage(form)), '_blank', 'noopener,noreferrer');
    trackPixel('Lead', { content_name: 'Canal WhatsApp' });
    setSent(true);
  };

  const reset = () => {
    setForm(INITIAL_FORM);
    setLocateStatus('idle');
    setSent(false);
  };

  if (sent) {
    return (
      <div className={`channel-form channel-form--sent ${compact ? 'channel-form--compact' : ''}`} role="status">
        <span className="channel-form__success-icon">
          <CircleCheck />
        </span>
        <h3 className="title-md">Cadastro enviado!</h3>
        <p>Finalize o envio da mensagem no WhatsApp e você passa a receber as novidades da causa animal. 🐾</p>
        {CONTACT.whatsappChannel && (
          <a href={CONTACT.whatsappChannel} target="_blank" rel="noopener noreferrer" className="btn btn--yellow">
            <Radio strokeWidth={2.3} />
            Seguir o canal oficial
          </a>
        )}
        <button type="button" className="btn btn--ghost-light" onClick={reset}>
          Fazer outro cadastro
        </button>
      </div>
    );
  }

  const fieldClass = (field: Field) => `channel-form__field ${errors[field] ? 'has-error' : ''}`;
  const errorText = (field: Field) => errors[field] && <small role="alert">{errors[field]}</small>;

  return (
    <form className={`channel-form ${compact ? 'channel-form--compact' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="channel-form__header">
        <span className="channel-form__eyebrow">Canal WhatsApp</span>
        <h3 className="title-md">
          Participe do <span className="text-yellow">canal</span>
        </h3>
        {!compact && <p>Preencha e receba as novidades da causa animal em primeira mão.</p>}
      </div>

      <div className="channel-form__grid">
        <label className={fieldClass('name')}>
          <span>Nome</span>
          <input
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Seu nome completo"
            autoComplete="name"
            maxLength={MAX_LENGTH.name}
            aria-invalid={Boolean(errors.name)}
          />
          {errorText('name')}
        </label>

        <label className={fieldClass('phone')}>
          <span>WhatsApp</span>
          <span className="channel-form__phone">
            <span className="channel-form__ddi" aria-hidden="true">
              <BrazilFlag className="channel-form__flag" />
              +55
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={handleChange('phone')}
              placeholder="(86) 90000-0000"
              inputMode="tel"
              autoComplete="tel-national"
              aria-invalid={Boolean(errors.phone)}
            />
          </span>
          {errorText('phone')}
        </label>

        <div className={fieldClass('city')}>
          <span className="channel-form__label-row">
            <label htmlFor={`${citiesListId}-city`}>Cidade</label>
            <button
              type="button"
              className={`channel-form__locate is-${locateStatus}`}
              onClick={handleLocate}
              disabled={locateStatus === 'loading'}
            >
              {locateStatus === 'loading' ? <LoaderCircle className="spin" /> : <LocateFixed strokeWidth={2.4} />}
              <span aria-live="polite">{LOCATE_LABEL[locateStatus]}</span>
            </button>
          </span>
          <input
            id={`${citiesListId}-city`}
            type="text"
            value={form.city}
            onChange={handleChange('city')}
            placeholder="Sua cidade"
            list={citiesListId}
            autoComplete="address-level2"
            maxLength={MAX_LENGTH.city}
            aria-invalid={Boolean(errors.city)}
          />
          <datalist id={citiesListId}>
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
          {errorText('city')}
        </div>

        <label className={fieldClass('neighborhood')}>
          <span>Bairro</span>
          <input
            type="text"
            value={form.neighborhood}
            onChange={handleChange('neighborhood')}
            placeholder="Seu bairro"
            autoComplete="address-level3"
            maxLength={MAX_LENGTH.neighborhood}
            aria-invalid={Boolean(errors.neighborhood)}
          />
          {errorText('neighborhood')}
        </label>

        {!compact && (
          <label className="channel-form__field channel-form__full">
            <span>Mensagem para a equipe (opcional)</span>
            <input
              type="text"
              value={form.message}
              onChange={handleChange('message')}
              placeholder="Sua mensagem"
              maxLength={MAX_LENGTH.message}
            />
          </label>
        )}
      </div>

      <button type="submit" className="btn btn--yellow btn--block">
        <WhatsAppIcon strokeWidth={2.2} />
        Quero entrar no canal
      </button>
      <p className="channel-form__privacy">Seus dados vão só para o WhatsApp. Nada fica salvo aqui.</p>
    </form>
  );
}
