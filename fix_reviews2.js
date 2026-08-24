const fs = require('fs');
let code = fs.readFileSync('app/reviews/ClientReviewsPage.tsx', 'utf8');

code = code.replace(/reviews\.map\(\(review, index\) => \(/g, "reviews.map((review: any, index: number) => (");
code = code.replace(/videos\.map\(\(video, index\) => \(/g, "videos.map((video: any, index: number) => (");
code = code.replace(/caseStudies\.map\(\(caseStudy, index\) => \(/g, "caseStudies.map((caseStudy: any, index: number) => (");

fs.writeFileSync('app/reviews/ClientReviewsPage.tsx', code);
console.log('done fixing');
