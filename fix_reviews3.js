const fs = require('fs');
let code = fs.readFileSync('app/reviews/ClientReviewsPage.tsx', 'utf8');

code = code.replace(/parsedGoogleReviews\.map\(\(review, index\) => \(/g, "parsedGoogleReviews.map((review: any, index: number) => (");
code = code.replace(/parsedVideoTestimonials\.map\(\(video, index\) => \(/g, "parsedVideoTestimonials.map((video: any, index: number) => (");
code = code.replace(/parsedCaseStudies\.map\(\(caseStudy, index\) => \(/g, "parsedCaseStudies.map((caseStudy: any, index: number) => (");

fs.writeFileSync('app/reviews/ClientReviewsPage.tsx', code);
console.log('done fixing reviews 3');
