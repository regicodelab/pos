import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CategoriesDropdown = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] =  useState('');

  useEffect(() => {
    setActiveTab(window.location.pathname.slice(1));
  }, [activeTab, navigate]);

    return (
            <select 
              name="category"
              id="category"
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none"
              onChange={(e) => {
                const selectedCategory = e.target.value;
                navigate(`/${selectedCategory}`);
              }}
              value={activeTab}
            >
              <option value="tengrohta">Te ngrohta</option>
              <option value="teftohta">Te ftohta</option>
              <option value="kuzhina">Kuzhina</option>
              <option value="promocionale">Promocionale</option>
            </select>
    )
}

export default CategoriesDropdown