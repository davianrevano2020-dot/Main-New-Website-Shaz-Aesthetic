import re

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'r') as f:
    content = f.read()

# Imports
content = content.replace(
    '  AlertCircle\n} from \'lucide-react\';',
    '  AlertCircle,\n  Upload,\n  Loader2\n} from \'lucide-react\';'
)

# Upload state and helper
upload_helper = """  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, setter: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.url) {
        setter(data.url);
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Upload error', error);
      alert('Upload failed. Check console for details.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {"""
content = content.replace('  const handleSave = async () => {', upload_helper)

# Refer a friend image field
old_refer_img = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <input
                    type="text"
                    value={referImg}
                    onChange={(e) => setReferImg(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>"""
new_refer_img = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={referImg}
                      onChange={(e) => setReferImg(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50 bg-brand-white"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <label className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-sage text-white rounded-xl cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap min-w-[120px]">
                      {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                      <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, setReferImg)} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>"""
content = content.replace(old_refer_img, new_refer_img)

# Campaigns edit image field
old_campaign_img = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <input
                    type="text"
                    value={editingCampaign.image}
                    onChange={(e) => setEditingCampaign({...editingCampaign, image: e.target.value})}
                    className="w-full px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                  />
                </div>"""
new_campaign_img = """                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Image URL</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editingCampaign.image}
                      onChange={(e) => setEditingCampaign({...editingCampaign, image: e.target.value})}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-brand-beige focus:outline-none focus:ring-2 focus:ring-brand-sage/50"
                    />
                    <label className="flex items-center justify-center gap-2 px-4 bg-brand-sage text-white rounded-lg cursor-pointer hover:bg-brand-forest transition-colors whitespace-nowrap">
                      {isUploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <span className="text-sm">{isUploading ? '...' : 'Upload'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleImageUpload(e, (url) => setEditingCampaign({...editingCampaign, image: url}))} 
                        disabled={isUploading}
                      />
                    </label>
                  </div>
                </div>"""
content = content.replace(old_campaign_img, new_campaign_img)

with open('app/back-office/promotion/ClientPromotionBackOffice.tsx', 'w') as f:
    f.write(content)

