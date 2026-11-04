import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from 'firebase/auth'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { auth } from '../firebase.js'

const ERROR_MESSAGES = {
  'auth/email-already-in-use': 'An account already exists for this email.',
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/missing-password': 'Enter your password.',
  'auth/popup-closed-by-user': 'The Google sign-in window was closed before completing.',
  'auth/popup-blocked': 'Allow pop-ups in your browser to use Google sign-in.',
  'auth/network-request-failed': 'Network request failed. Check your internet connection and try again.',
  'auth/operation-not-allowed': 'Email/password sign-in is disabled in Firebase Console.',
  'auth/too-many-requests': 'Too many attempts. Wait a moment and try again.',
  'auth/user-not-found': 'No account exists for this email address.',
  'auth/weak-password': 'Use a password with at least 6 characters.',
}

function AuthPage({ mode }) {
  const isRegister = mode === 'register'
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setResetMessage('')
    setSubmitting(true)

    try {
      if (isRegister) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password)
        await updateProfile(credential.user, { displayName: name.trim() })
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password)
      }

      const destination = location.state?.from?.pathname ?? '/'
      navigate(destination, { replace: true })
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] ?? `Firebase error (${err.code ?? 'unknown'}). Please check the Firebase configuration.`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleGoogleSignIn() {
    setError('')
    setResetMessage('')
    setSubmitting(true)

    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      const destination = location.state?.from?.pathname ?? '/'
      navigate(destination, { replace: true })
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] ?? `Firebase error (${err.code ?? 'unknown'}). Please check the Firebase configuration.`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleForgotPassword() {
    setError('')
    setResetMessage('')

    if (!email.trim()) {
      setError('Enter your email address first.')
      return
    }

    try {
      await sendPasswordResetEmail(auth, email.trim())
      setResetMessage('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] ?? `Firebase error (${err.code ?? 'unknown'}). Please check the Firebase configuration.`)
    }
  }

  return (
    <section className="card auth-page">
      <h2>{isRegister ? 'Create your account' : 'Log in to CampusEats'}</h2>
      <p className="muted">
        {isRegister ? 'Register to place orders and view your order history.' : 'Log in to access your cart and orders.'}
      </p>
      <form className="form" onSubmit={handleSubmit}>
        {isRegister && (
          <>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              minLength={2}
              autoComplete="name"
            />
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          autoComplete="email"
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
          autoComplete={isRegister ? 'new-password' : 'current-password'}
        />
        {error && <p className="field-error" role="alert">{error}</p>}
        {resetMessage && <p className="success-message" role="status">{resetMessage}</p>}
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Please wait?' : isRegister ? 'Register' : 'Log in'}
        </button>
        {!isRegister && (
          <>
            <button className="btn btn-outline" type="button" onClick={handleForgotPassword}>
              Forgot password?
            </button>
            <button className="btn btn-outline" type="button" onClick={handleGoogleSignIn} disabled={submitting}>
              Continue with Google
            </button>
          </>
        )}
      </form>
      <p>
        {isRegister ? 'Already have an account? ' : 'Need an account? '}
        <Link to={isRegister ? '/login' : '/register'}>
          {isRegister ? 'Log in' : 'Register'}
        </Link>
      </p>
    </section>
  )
}

export default AuthPage
