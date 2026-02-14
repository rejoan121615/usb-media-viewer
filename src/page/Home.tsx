import React from 'react';
import { SidebarLayout } from '@/components/SidebarLayout';

const Home = () => {
  return (
    <SidebarLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to My App</h1>
        <p>Hello Mohd Rejoan! This is your home page with a sidebar.</p>
      </div>
    </SidebarLayout>
  );
};

export default Home;