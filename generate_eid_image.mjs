import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function main() {
  try {
    const zai = await ZAI.create();
    console.log('SDK initialized, generating image...');
    
    const response = await zai.images.generations.create({
      prompt: "Eid-Ul-Adha Mubarak greeting card, golden crescent moon and star, beautiful mosque silhouette, warm hanging lanterns, Islamic geometric patterns in gold and emerald green borders, jasmine flowers, festive celebration, warm golden lighting, bokeh, luxurious, high quality digital art",
      size: '1152x864'
    });
    
    const imageBase64 = response.data[0].base64;
    const buffer = Buffer.from(imageBase64, 'base64');
    fs.writeFileSync('/home/z/my-project/download/eid_mubarak_vexis.png', buffer);
    console.log('SUCCESS: Image saved');
  } catch (error) {
    console.error('ERROR:', error.message);
  }
}
main();
