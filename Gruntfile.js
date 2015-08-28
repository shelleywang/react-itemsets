module.exports = function(grunt) {

  grunt.initConfig({

    // jshint: {
    //   files: ['Gruntfile.js', 'client/js/**/*.js', 'server/**/*.js'],
    //   options: {
    //     globals: {
    //       jQuery: true
    //     }
    //   }
    // },

    // uglify: {
    //   js: {
    //     files: {
    //       'public/build.js': [
    //         'client/js/player.js',
    //         'client/js/preload.js',
    //         'client/js/create.js',
    //         'client/js/update.js',
    //         'client/js/game.js'
    //       ]
    //     }
    //   }
    // },  

    // watch: {
    //   files: ['Gruntfile.js', 'public/**/*.js', 'server/**/*.js'],
    //   tasks: ['build']
    // },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  // grunt.registerTask('build',
  //   ['jshint',
  //    'uglify']
  // );

  grunt.registerTask('start',
    // ['build',
    //  'concurrent']
    ['nodemon']
  );
};