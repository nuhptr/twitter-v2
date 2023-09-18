import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useCallback, useState } from 'react'
import { signIn } from 'next-auth/react'

import useLoginModal from '@/hooks/use-login-modal'
import useRegisterModal from '@/hooks/use-register-modal'

import Input from '../general/input'
import Modal from '../general/modal'

export default function RegisterModal() {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const onToggle = useCallback(() => {
    if (isLoading) return

    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal, isLoading])

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true)

      await axios.post('/api/register', { email, password, username, name })
      setIsLoading(false)

      toast.success('Account created.')
      signIn('credentials', { email, password })

      registerModal.onClose()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }, [email, password, registerModal, username, name])

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        disabled={isLoading}
        placeholder='Email'
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder='Name'
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder='Username'
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        disabled={isLoading}
        placeholder='Password'
        type='password'
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
  )

  const footerContent = (
    <div className='mt-4 text-center text-neutral-400'>
      <p>
        Already have an account?
        <span onClick={onToggle} className='text-white cursor-pointer hover:underline'>
          {' '}
          Sign in
        </span>
      </p>
    </div>
  )

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={onSubmit}
      disabled={isLoading}
      title='Create an account'
      actionLabel='Register'
      body={bodyContent}
      footer={footerContent}
    />
  )
}
