import { signIn, useSession } from 'next-auth/client'
import { Api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps){
  const [session] = useSession();
  async function handleSubscribe(){
    if(!session){
      signIn('github');
      return;
    }
    try {
      const response = await Api.post('/session');
      const { sessionId } = response.data;

      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({sessionId});
    } catch (error){
      alert(error)
    }
  }
  return (
    <button type="button" className={styles.subscribeButton} onClick={() => handleSubscribe()}>
      Subscribe now
    </button>
  )
}