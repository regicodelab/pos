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
        { name: 'Kafe', quantity: 2, price: 90.00 },
        { name: 'Uje', quantity: 1, price: 80.00 }
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
    <div className='flex'>
      <SidePanel />
      <div className='w-full py-10'>
        <div className="flex items-center justify-between mb-10 mx-12">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Settings
          </h1>
        </div>

        <div className='flex'>

          <div className='w-1/2 mx-12'>
            <div className='flex flex-col gap-4 mt-6 w-2/3'>
              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Business name</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter business name'
                  value={businessData.name}
                  onChange={(e) => setBusinessData({ ...businessData, name: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Adress</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter Adress'
                  value={businessData.address}
                  onChange={(e) => setBusinessData({ ...businessData, address: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>NIPT</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize'
                  placeholder='Enter NIPT'
                  value={businessData.nipt}
                  onChange={(e) => setBusinessData({ ...businessData, nipt: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>WiFi Password</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter Current WiFi Password'
                  value={businessData.wifiPassword}
                  onChange={(e) => setBusinessData({ ...businessData, wifiPassword: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Phone Number</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter Business Phone Number'
                  value={businessData.phoneNumber}
                  onChange={(e) => setBusinessData({ ...businessData, phoneNumber: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Opening Hours</label>
                <input
                  type="text"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter Opening Hours'
                  value={businessData.openingHours}
                  onChange={(e) => setBusinessData({ ...businessData, openingHours: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Logo</label>
                <input
                  type="url"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter Logo URL'
                  value={businessData.logoUrl}
                  onChange={(e) => setBusinessData({ ...businessData, logoUrl: e.target.value })}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-sm font-medium'>Euro exchange rate</label>
                <input
                  type="number"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Ex. 1 Euro = X ALL'
                  value={businessData.euroExchangeRate}
                  onChange={(e) => setBusinessData({ ...businessData, euroExchangeRate: e.target.value })}
                />
              </div>

              <div className='flex gap-1'>
                <input
                  type="checkbox"
                  className='border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  checked={businessData.moreSettings}
                  onChange={(e) => setBusinessData({ ...businessData, moreSettings: e.target.checked })}
                />
                <label className='text-sm font-medium'>Check more settings</label>
              </div>

              <CustomButton title="Save Changes" onClick={handleBusinessSave} />
            </div>
          </div>

          <div className='w-1/3'>
            <CustomButton
              title="Test invoice"
              onClick={handleTestInvoicePrint}
            />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Settings