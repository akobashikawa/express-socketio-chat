function generateMessage(name) {
    return name ? `Hola ${name}!` : 'Hola!';
}

module.exports = {
    generateMessage,
};