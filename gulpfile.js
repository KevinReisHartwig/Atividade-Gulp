//módulos necessários do Gulp e de suas dependências
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass')); // plugin gulp-sass e a implementação do Sass
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin'); //precisa ser a versão 7.1.0

// Define a função para comprimir imagens
function comprimerImagens() {
    return gulp.src('./source/images/*') // Seleciona os arquivos de imagens na pasta source/images
        .pipe(imagemin()) // Comprime as imagens
        .pipe(gulp.dest('./build/images')); // Salva as imagens comprimidas na pasta build/images
}

// Define a função para comprimir JavaScript
function comprimerJavaScript() {
    return gulp.src('./source/scripts/*.js') // Seleciona os arquivos JavaScript na pasta source/scripts
        .pipe(uglify()) // Minifica o JavaScript
        .pipe(obfuscate()) // Ofusca o código JavaScript para não poderem ver
        .pipe(gulp.dest('./build/scripts')) // Salva os arquivos JavaScript comprimidos na pasta build/scripts
}

// Define a função para compilar SASS
function compilarSass() {
    return gulp.src('./source/styles/main.scss') // Seleciona o arquivo principal de estilos main.scss na pasta source/styles
        .pipe(sourcemaps.init()) // Inicia a criação de sourcemaps para os estilos
        .pipe(sass({ 
            outputStyle: 'compressed' })) // Compila o SASS e comprime o resultado
        .pipe(sourcemaps.write('./maps')) // Escreve os sourcemaps na pasta maps
        .pipe(gulp.dest('./build/styles')); // Salva o arquivo CSS compilado na pasta build/styles
}

// O default exporta a tarefa padrão do Gulp.
// Observa mudanças nos arquivos .scss, .js e imagens nas pastas e executa a função quando detectadas.
exports.default = function() {  
    gulp.watch('./source/styles/*.scss', { ignoreInitial: false }, gulp.series(compilarSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false }, gulp.series(comprimerJavaScript));
    gulp.watch('./source/images/*', { ignoreInitial: false }, gulp.series(comprimerImagens));
}
