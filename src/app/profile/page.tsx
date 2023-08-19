import { FormItem, Input } from '@/components/atoms';
import React from 'react';

const ProfilePage = ()=> {
  return (
    <div>
      <FormItem
      label='nome'>
        <Input />
      </FormItem>
      <FormItem
      label='email'>
        <Input disabled placeholder='mariodasilva@gmail.com'/>
      </FormItem>
    </div>
  )
}

export default ProfilePage;