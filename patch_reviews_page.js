const fs = require('fs');
const file = 'app/reviews/ClientReviewsPage.tsx';
let code = fs.readFileSync(file, 'utf8');

const parseArray = `  const parsedGoogleReviews = (() => {
    if (initialContent?.reviews_google) {
      try { return JSON.parse(initialContent.reviews_google); } catch(e) {}
    }
    return GOOGLE_REVIEWS;
  })();

  const parsedVideoTestimonials = (() => {
    if (initialContent?.reviews_video) {
      try { return JSON.parse(initialContent.reviews_video); } catch(e) {}
    }
    return VIDEO_TESTIMONIALS;
  })();

  const parsedSuccessCases = (() => {
    if (initialContent?.reviews_cases) {
      try { return JSON.parse(initialContent.reviews_cases); } catch(e) {}
    }
    return SUCCESS_CASES;
  })();`;

if (!code.includes('parsedGoogleReviews')) {
    code = code.replace(
        'export default function ClientReviewsPage({ initialContent }: { initialContent: any }) {',
        `export default function ClientReviewsPage({ initialContent }: { initialContent: any }) {\n${parseArray}`
    );
    
    // Replace array references
    code = code.replace(/{GOOGLE_REVIEWS.map/g, '{parsedGoogleReviews.map');
    code = code.replace(/{VIDEO_TESTIMONIALS.map/g, '{parsedVideoTestimonials.map');
    code = code.replace(/{SUCCESS_CASES.map/g, '{parsedSuccessCases.map');

    // Replace hero section content with fallback to old default
    code = code.replace(
        />Client Experiences</,
        '>{initialContent?.reviews_hero_badge || "CLIENT EXPERIENCES"}<'
    );
    code = code.replace(
        />STORIES OF TRANSFORMATION</,
        '>{initialContent?.reviews_hero_title || "STORIES OF TRANSFORMATION"}<'
    );
    code = code.replace(
        />Read what our clients have to say about their journey with SHAZ Aesthetic Clinic.</,
        '>{initialContent?.reviews_hero_subtitle || "Read what our clients have to say about their journey with SHAZ Aesthetic Clinic."}<'
    );
    code = code.replace(
        /https:\/\/img\.shazaestheticbali\.com\/header-background-banner\.jpg/,
        '${initialContent?.reviews_hero_image || "https://img.shazaestheticbali.com/header-background-banner.jpg"}'
    );

    fs.writeFileSync(file, code);
    console.log('Patched ClientReviewsPage.tsx');
}
