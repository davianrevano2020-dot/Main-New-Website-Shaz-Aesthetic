import re

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'r') as f:
    content = f.read()

# Replace handleSave
old_save = """  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const updates = {
        promo_campaigns: JSON.stringify(campaigns),
        promo_refer_title: referTitle,
        promo_refer_desc: referDesc,
        promo_refer_img: referImg,
        promo_gift_title: giftTitle,
        promo_gift_desc: giftDesc,
        promo_gift_img: giftImg
      };

      await updateSiteContent(updates);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save promotion settings', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };"""

new_save = """  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    try {
      const updates = {
        promo_campaigns: JSON.stringify(campaigns),
        promo_refer_title: referTitle,
        promo_refer_desc: referDesc,
        promo_refer_img: referImg,
        promo_gift_title: giftTitle,
        promo_gift_desc: giftDesc,
        promo_gift_img: giftImg
      };

      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!res.ok) throw new Error('Failed to save');
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Failed to save promotion settings', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };"""

content = content.replace(old_save, new_save)

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'w') as f:
    f.write(content)
