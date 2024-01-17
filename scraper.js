// Importa la biblioteca Puppeteer para automatizar el navegador
const puppeteer = require('puppeteer');

// Función para iniciar sesión en la página web
const login = async (page, email, password) => {
  console.log('Iniciando sesión...');
  
  // Navega a la página de inicio de sesión
  await page.goto('http://localhost:8000/login');
  
  // Completa los campos de correo electrónico y contraseña
  await page.type('#email', email);
  await page.type('#password', password);
  
  // Envía el formulario de inicio de sesión haciendo click en el botón
  await page.click('form button');
  
  // Espera a que la página navegue después del inicio de sesión (timeout de 10 segundos)
  await page.waitForNavigation(30000);
  
  console.log('Inicio de sesión exitoso.');
};

// Función para completar el formulario con los datos proporcionados
const fillForm = async (page, userData) => {
  console.log('Rellenando el formulario...');
  
  // Completa los campos del formulario con los datos del usuario
  await page.type('#email', userData.email);
  await page.type('#password', userData.password);
  await page.type('#confirmation_password', userData.confirmation_password);
  await page.type('#first_name', userData.first_name);
  await page.type('#last_name', userData.last_name);
  await page.type('#company', userData.company);
  await page.type('#phone_number', userData.phone_number);
  
  // Selecciona la opción de la pregunta de seguridad desde un menú desplegable
  await page.select('select', userData.security_question);
  
  console.log('Formulario completado.');
};

// Función para descargar y mostrar un archivo PDF desde la página
const downloadAndDisplayPDF = async (page) => {
  console.log('Iniciando descarga del PDF...');
  
  // Espera a que el botón de descarga no esté deshabilitado
  await page.waitForFunction(() => !document.querySelector('#downloadButton').disabled);
  
  // Hace clic en el botón de descarga
  await page.click('#downloadButton');
  
  // Espera a que se descargue el archivo
  await page.waitForTimeout(60000);
  
  console.log('PDF descargado exitosamente.');
  
  // Cierra la página después de la descarga
  await page.close();
};

// Función principal que ejecuta el proceso de scraping
const scrape = async (userData) => {

  // Inicia un nuevo navegador Puppeteer en modo visible (headless: true para no visualizarlo)
  const browser = await puppeteer.launch({ headless: false });

  // Crea una nueva página en el navegador 
  const page = await browser.newPage();
  
  try {
    // Ejecuta las funciones de inicio de sesión, completar formulario y descargar PDF
    await login(page, userData.email, userData.password);
    await fillForm(page, userData);
    await downloadAndDisplayPDF(page);
    
    console.log('Proceso de scraping completado con éxito.');
  } catch (error) {
    console.error('Error durante el scraping:', error);
  } finally {
    // Cierra el navegador después de completar el proceso
    await browser.close();
  }
};

// Este Json mockea la data, Datos del usuario para realizar el scraping
const userData = {
  "email": "r8write@tech.com",
  "password": "P@ssw0rd123#R8",
  "confirmation_password": "P@ssw0rd123#R8",
  "first_name": "John",
  "last_name": "Doe",
  "company": "R8write",
  "phone_number": "+1234567890",
  "security_question": "Pablito",
};

// Llama a la función principal para iniciar el proceso de scraping con los datos del usuario
scrape(userData);
