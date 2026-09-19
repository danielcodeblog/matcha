import { Product, Testimonial, FunFact } from '../types';

import heroBowlImg from '../assets/images/hero_matcha_bowl_1788567906920.jpg';
import whiskedCupImg from '../assets/images/matcha_whisked_cup_1788568010494.jpg';
import handsBowlImg from '../assets/images/hands_matcha_bowl_1788568028535.jpg';
import whiskMatImg from '../assets/images/whisk_powder_mat_1788568043806.jpg';
import latteLeavesImg from '../assets/images/latte_leaves_table_1788568059889.jpg';
import powderBowlImg from '../assets/images/matcha_powder_bowl_1788567991651.jpg';
import whiskKitImg from '../assets/images/matcha_whisk_kit_1788567936094.jpg';
import latteCupImg from '../assets/images/matcha_latte_cup_1788567950212.jpg';
import cakeSliceImg from '../assets/images/matcha_cake_slice_1788567966123.jpg';
import plantationImg from '../assets/images/tea_plantation_1788567921703.jpg';
import badgeLeafImg from '../assets/images/matcha_badge_leaf_1788568852579.jpg';

export const ASSETS = {
  heroBowl: heroBowlImg,
  whiskedCup: whiskedCupImg,
  handsBowl: handsBowlImg,
  whiskMat: whiskMatImg,
  latteLeaves: latteLeavesImg,
  powderBowl: powderBowlImg,
  whiskKit: whiskKitImg,
  latteCup: latteCupImg,
  cakeSlice: cakeSliceImg,
  plantation: plantationImg,
  badgeLeaf: badgeLeafImg,
};

export const FUN_FACTS: FunFact[] = [
  {
    id: 'antioxidants',
    title: 'POWERFUL',
    subtitle: 'ANTIOXIDANTS',
    image: ASSETS.handsBowl,
    detail: 'Matcha contains up to 137 times more antioxidants (EGCG catechins) than standard brewed green tea, helping combat oxidative stress and cellular aging.',
  },
  {
    id: 'detoxifier',
    title: 'NATURAL',
    subtitle: 'DETOXIFIER',
    image: ASSETS.whiskMat,
    detail: 'Shade-grown for weeks prior to harvest, matcha leaves develop supreme chlorophyll levels that support the body’s natural elimination of heavy metals and toxins.',
  },
  {
    id: 'metabolism',
    title: 'BOOSTS',
    subtitle: 'METABOLISM',
    image: ASSETS.latteLeaves,
    detail: 'Rich in L-theanine paired with natural caffeine, matcha provides sustained thermogenic metabolic support and steady energy without heart spikes or afternoon crashes.',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'powder',
    category: 'powder',
    title: 'MATCHA POWDER',
    subtitle: 'Finest Ceremonial, Latte, And Culinary Grade Matcha For Every Occasion',
    tagline: 'First-harvest shade-grown Uji tencha stone-ground to silky perfection.',
    price: 34,
    originalPrice: 42,
    image: ASSETS.powderBowl,
    rating: 4.9,
    reviewsCount: 384,
    description: 'Directly sourced from single-estate tea farmers in Uji, Kyoto. Vibrant emerald color with a natural sweet umami finish and velvety mouthfeel without astringency.',
    tastingNotes: ['Sweet Umami', 'Fresh Greens', 'Velvety Creaminess', 'Zero Bitterness'],
    features: [
      '100% Organic First Harvest (Ichibancha)',
      'Granite stone-milled (only 30g per hour per mill)',
      'Rich in L-theanine and EGCG antioxidants',
      'Vacuum-sealed in Kyoto for utmost freshness',
    ],
    options: ['Ceremonial Grade (30g Tin)', 'Ceremonial Grade (80g Refill)', 'Latte & Culinary Grade (100g)'],
  },
  {
    id: 'kit',
    category: 'kit',
    title: 'MATCHA KIT',
    subtitle: 'Ideal For Beginners And Matcha Enthusiasts Alike',
    tagline: 'Everything you need for authentic Japanese tea preparation at home.',
    price: 58,
    originalPrice: 72,
    image: ASSETS.whiskKit,
    rating: 5.0,
    reviewsCount: 219,
    description: 'The definitive tea ceremony starter set. Includes a 100-prong handcrafted golden bamboo whisk (chasen), bamboo scoop (chashaku), whisk shaper stand, and artisanal glazed ceramic bowl (chawan).',
    tastingNotes: ['Traditional Technique', 'Effortless Jade Froth', 'Artisanal Ceramic Craft'],
    features: [
      'Hand-carved 100-prong bamboo chasen',
      'Ceramic whisk keeper to preserve prong curvature',
      'Handmade stoneware chawan with pouring spout',
      'Includes illustrated step-by-step preparation guide',
    ],
    options: ['Matte Obsidian Set', 'Natural Cream Stoneware Set', 'Sage Olive Collector Edition'],
  },
  {
    id: 'drink',
    category: 'drink',
    title: 'MATCHA DRINK',
    subtitle: 'Perfect For Lattes, Smoothies, And Iced Matcha',
    tagline: 'Ready-to-whisk premium barista blends formulated for plant-based milks.',
    price: 28,
    originalPrice: 35,
    image: ASSETS.latteCup,
    rating: 4.8,
    reviewsCount: 165,
    description: 'Specially crafted for effortless morning beverages. Blends seamlessly with oat milk, almond milk, or coconut milk, delivering a rich frothy cafe-style experience at home in seconds.',
    tastingNotes: ['Creamy Vanilla Undertones', 'Rich Roasted Notes', 'Silky Jade Body'],
    features: [
      'Dissolves effortlessly without clumps',
      'Crafted specifically to pair with oat and almond milk',
      'No added refined sugars or artificial preservatives',
      'Approx. 35 servings per resealable pouch',
    ],
    options: ['Pure Barista Reserve (100g)', 'Madagascar Vanilla Matcha Blend', 'Iced Coconut Refresher Blend'],
  },
  {
    id: 'cake',
    category: 'cake',
    title: 'MATCHA CAKE',
    subtitle: 'Delectable Matcha Cakes, Cookies, And Desserts',
    tagline: 'Artisanal confections made with our signature ceremonial matcha.',
    price: 46,
    originalPrice: 55,
    image: ASSETS.cakeSlice,
    rating: 4.9,
    reviewsCount: 142,
    description: 'Created in collaboration with master pastry chefs. Featuring twenty paper-thin handmade crepes layered with fresh ceremonial matcha infused mascarpone pastry cream and topped with delicate matcha dust.',
    tastingNotes: ['Melts in Mouth', 'Earthy & Delicately Sweet', 'Whipped Cream Silkiness'],
    features: [
      'Baked fresh and blast-chilled for pristine nationwide delivery',
      'Made with authentic Uji ceremonial grade matcha',
      'Serves 6–8 generous portions',
      'Eco-friendly insulated temperature-safe packaging',
    ],
    options: ['20-Layer Mille Crêpe Cake (7-inch)', 'Matcha Basque Cheesecake (6-inch)', 'Truffle & Cookie Tasting Box'],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'sarah',
    quote: 'MatchaNova Has Completely Transformed My Mornings! The Energy Is So Clean And Focused, Without Any Jitters. I Truly Feel More Calm And Productive Throughout The Day. Highly Recommend!',
    author: 'Sarah M.',
    rating: 5,
    location: 'San Francisco, CA',
    verified: true,
  },
  {
    id: 'emily',
    quote: "Finally Found A Matcha That Helps Me Stay Focused Without The Midday Crash. MatchaNova Is My New Go-To. Plus, Knowing It's Packed With Antioxidants Makes It Even Better!",
    author: 'Emily R.',
    rating: 5,
    location: 'Austin, TX',
    verified: true,
  },
];
