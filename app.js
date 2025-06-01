console.log("Conectao' Jevi! por: MiguelAC");

const inputNumber = document.getElementById("inputNumber");
const textBox1 = document.getElementById("textBox1");
const textBox2 = document.getElementById("textBox2");
const infoError = document.getElementById("info-error");

// Limita el input del número entre 1 y 27
inputNumber.setAttribute("min", 1);
inputNumber.setAttribute("max", 26);

// Validación del input numérico
inputNumber.addEventListener("input", () => {
  const value = parseInt(inputNumber.value, 10);
  if (isNaN(value) || value < 1 || value > 26) {
    inputNumber.value = ""; // Limpiar si no es válido
    textBox1.value = ""; // Limpiar el texto cifrado
    textBox2.value = ""; // Limpiar el texto cifrado
    textBox1.disabled = true; // Deshabilitar el campo de texto
    textBox2.disabled = true; // Deshabilitar el campo de texto cifrado
    infoError.hidden = false; // Mostrar mensaje de error
  } else {
    infoError.hidden = true; // ocultar mensaje de error
    textBox1.disabled = false; // Habilitar el campo de texto
    textBox2.disabled = false; // Habilitar el campo de texto cifrado
  }
});

// Función de copiado
function copyText() {
    const textToCopy = `${inputNumber.value}: ${textBox2.value}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      alert("Texto copiado al portapapeles!");
    });
  }

  // Función de Clear
function clearText() {
    textBox1.value = "";
    textBox2.value = "";
  }

// Función de cifrado
function encrypt(text, shift) {
  const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
  let result = "";

  for (let char of text.toUpperCase()) {
    const index = alphabet.indexOf(char);
    if (index === -1) {
      result += char; // Si no está en el alfabeto (como espacio o número), se mantiene igual
    } else {
      const newIndex = (index + shift) % 27;
      result += alphabet[newIndex];
    }
  }

  return result;
}

// Escuchar cambios en el texto
textBox1.addEventListener("input", () => {
  const shift = parseInt(inputNumber.value, 10);

  if (!isNaN(shift) && shift >= 1 && shift <= 27) {
    const encrypted = encrypt(textBox1.value, shift);
    textBox2.value = encrypted;
  } else {
    textBox2.value = ""; // Si el número no es válido, limpiamos
  }
});
