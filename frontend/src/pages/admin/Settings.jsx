import React, { useEffect, useState } from 'react'
import SidePanel from '../../components/admin/SidePanel'
import CustomButton from '../../components/CustomButton'
import { fetchBusinessesFromAPI, updateBusinessDetails } from '../../api/business';
import logoImage from '../../images/qrcode.png';
import { toast } from 'react-hot-toast';

const Settings = () => {
  const [businessData, setBusinessData] = useState({
    id: '',
    name: '',
    address: '',
    nipt: '',
    wifiPassword: '',
    phoneNumber: '',
    openingHours: '',
    logoUrl: '',
    euroExchangeRate: '',
    moreSettings: false
  });

  async function handleBusinessSave() {
    try {
      await updateBusinessDetails(businessData.id, {
        name: businessData.name,
        address: businessData.address,
        nipt: businessData.nipt,
        wifi: businessData.wifiPassword,
        phone: businessData.phoneNumber,
        opening_hours: businessData.openingHours,
        logo_url: businessData.logoUrl,
        euro_exchange_rate: businessData.euroExchangeRate,
        more_settings: businessData.moreSettings
      });
      toast.success('Business details updated successfully!');
    } catch (error) {
      toast.error('Failed to update business details');
    }
  }

  async function fetchBusinessDetails() {
    const data = await fetchBusinessesFromAPI();
    setBusinessData({
      id: data._id,
      name: data.name,
      address: data.address,
      nipt: data.nipt,
      wifiPassword: data.wifi,
      phoneNumber: data.phone,
      openingHours: data.opening_hours,
      logoUrl: data.logo_url,
      euroExchangeRate: data.euro_exchange_rate,
      moreSettings: data.more_settings
    });
  }

  useEffect(() => {
    fetchBusinessDetails();
  }, []);

  function handleTestInvoicePrint() {
    toast('Printing test invoice...');
    
    const testInvoice = {
      id: '123',
      date: new Date().toLocaleDateString(),
      items: [
        { name: 'Coffee', quantity: 2, price: 90.00 },
        { name: 'Water', quantity: 1, price: 80.00 }
      ],
      totalBeforeVat: 216.00,
      vat: 54.00,
      totalAfterVat: 270.00,
    };

    const invoiceWindow = window.open('', 'Print Invoice', 'width=300,height=800');
    invoiceWindow.document.write('<html><head><title>Invoice</title></head><body style="display: flex; flex-direction: column; align-items: center; justify-content:center; font-family: Arial, sans-serif;">');
    invoiceWindow.document.write('<h1>Invoice #' + testInvoice.id + '</h1>');
    invoiceWindow.document.write('<p>' + businessData.address + '</p>');
    invoiceWindow.document.write('<p>' + businessData.nipt + '</p>');
    invoiceWindow.document.write('<p>Date: ' + testInvoice.date + '</p>');
    invoiceWindow.document.write('<table border="1" cellpadding="5" cellspacing="0"><tr><th>Item</th><th>Quantity</th><th>Price</th></tr>');
    testInvoice.items.forEach(item => {
      invoiceWindow.document.write('<tr><td>' + item.name + '</td><td>' + item.quantity + '</td><td>' + item.price.toFixed(2) + '</td></tr>');
    });
    invoiceWindow.document.write('</table>');
    invoiceWindow.document.write('<p>Total before VAT: ' + testInvoice.totalBeforeVat.toFixed(2) + '</p>');
    invoiceWindow.document.write('<p>VAT: ' + testInvoice.vat.toFixed(2) + '</p>');
    invoiceWindow.document.write('<h3>Total after VAT: ' + testInvoice.totalAfterVat.toFixed(2) + '</h3>');
    invoiceWindow.document.write('<img src="' + logoImage +  '" width="100px" height="100px">');
    invoiceWindow.window.write('<p>Thank you!</p>');
    invoiceWindow.document.write('</body></html>');
    invoiceWindow.document.close();
    invoiceWindow.print();
  }

  return (
    <div className='flex bg-neutral-50'>
      <SidePanel />
      <div className='flex-1 flex flex-col'>
        {/* Header */}
        <div className='bg-white border-b border-neutral-200 p-8'>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className='text-neutral-600 mt-1'>Configure your business information</p>
        </div>

        {/* Content */}
        <div className='flex-1 overflow-auto p-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl'>
            {/* Business Settings Form */}
            <div className='bg-white rounded-xl shadow-md border border-neutral-200 p-8'>
              <h2 className='text-xl font-bold text-neutral-900 mb-6'>Business Information</h2>
              
              <div className='space-y-5'>
                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Business Name</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='Enter business name'
                    value={businessData.name}
                    onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Address</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='Enter business address'
                    value={businessData.address}
                    onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>NIPT</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors uppercase'
                    placeholder='Enter NIPT'
                    value={businessData.nipt}
                    onChange={(e) => setBusinessData({ ...businessData, nipt: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>WiFi Password</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='Enter WiFi password'
                    value={businessData.wifiPassword}
                    onChange={(e) => setBusinessData({ ...businessData, wifiPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Phone Number</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='Enter phone number'
                    value={businessData.phoneNumber}
                    onChange={(e) => setBusinessData({ ...businessData, phoneNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Opening Hours</label>
                  <input
                    type="text"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='e.g., 08:00 - 22:00'
                    value={businessData.openingHours}
                    onChange={(e) => setBusinessData({ ...businessData, openingHours: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Logo URL</label>
                  <input
                    type="url"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='Enter logo URL'
                    value={businessData.logoUrl}
                    onChange={(e) => setBusinessData({ ...businessData, logoUrl: e.target.value })}
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-neutral-700 mb-2'>Euro Exchange Rate</label>
                  <input
                    type="number"
                    className='w-full px-4 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-colors'
                    placeholder='e.g., 108.5'
                    value={businessData.euroExchangeRate}
                    onChange={(e) => setBusinessData({ ...businessData, euroExchangeRate: e.target.value })}
                  />
                </div>

                <div className='flex items-center gap-3 pt-2'>
                  <input
                    id="more-settings"
                    type="checkbox"
                    className='w-5 h-5 rounded border-2 border-neutral-400 text-active focus:ring-active cursor-pointer accent-active'
                    checked={businessData.moreSettings}
                    onChange={(e) => setBusinessData({ ...businessData, moreSettings: e.target.checked })}
                  />
                  <label htmlFor="more-settings" className='text-sm font-medium text-neutral-700 cursor-pointer'>
                    Enable advanced settings
                  </label>
                </div>

                <CustomButton 
                  title="Save Changes" 
                  onClick={handleBusinessSave}
                  variant="success"
                  fullWidth
                />
              </div>
            </div>

            {/* Test Invoice Section */}
            <div className='bg-white rounded-xl shadow-md border border-neutral-200 p-8'>
              <h2 className='text-xl font-bold text-neutral-900 mb-6'>Invoice Testing</h2>
              
              <div className='flex flex-col h-full justify-around'>
                <div className='space-y-4'>
                  <div className='bg-info-light rounded-lg p-4 border border-info'>
                    <p className='text-info-text text-sm'>
                      <strong>Test Your Invoice:</strong> Click the button below to generate and print a sample invoice with your current settings.
                    </p>
                  </div>

                  <div className='bg-neutral-100 rounded-lg p-6 space-y-3'>
                    <p className='text-sm font-medium text-neutral-700'>Sample Invoice Preview</p>
                    <div className='text-neutral-600 text-sm space-y-1'>
                      <p>• 2x Coffee - 90.00 ALL</p>
                      <p>• 1x Water - 80.00 ALL</p>
                      <p className='font-semibold text-neutral-900 pt-2'>Total: 270.00 ALL</p>
                    </div>
                  </div>
                </div>

                <CustomButton 
                  title="Print Test Invoice" 
                  onClick={handleTestInvoicePrint}
                  variant="success"
                  fullWidth
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings