new Vue({
    el: '#app',
    data: {
          userHealth: 100,
          monsterHealth: 100,
          isRunning: false,
          monsterDamage: 0,
          steps: []
      },
      methods: {
        
          startGame: function() {
              this.isRunning = true;
              this.userHealth = 100;
              this.monsterHealth = 100;
              this.steps = [];
          },
          healthValues: function(min, max) {
              let damage = Math.max(Math.floor(Math.random() * max) + 1, min);
              
              return damage;
          },
          monsterAttacks: function() {
              let damage = this.healthValues(5, 12)
              this.userHealth -= damage;
              this.steps.unshift({
                  isUser: false,
                  text: 'Противник отнял ' + damage + ' очков здоровья'
              });
              this.returnResult();
          },
          returnResult: function() {
              if (this.monsterHealth <= 0) {
                  if (confirm('Победа! Начать заново?')) {
                    this.startGame();
                  }
                  else {
                    this.isRunning = false;
                    this.userHealth = 100;
                    this.monsterHealth = 100;
                    this.steps = [];
                  }
                  return true;
              }
              else if (this.userHealth <= 0) {
                      if (confirm('Проиграл:( Попробуешь еще раз?')) {
                          this.startGame();
                      }
                      else {
                          this.isRunning = false;
                          this.userHealth = 100;
                          this.monsterHealth = 100;
                          this.steps = [];
                      }
                      return true;
                  }
                  return false;
          },
          attack: function() {
              let damage = this.healthValues(3, 10);
              this.steps.unshift({
                  isUser: true,
                  text: 'Игрок отнял ' + damage + ' очков здоровья'
              });
              this.monsterHealth -= damage;

              if (this.returnResult()) {
                  return;
              }

              this.monsterAttacks();
          },
          powerAttack: function() {
              let damage = this.healthValues(10, 17);
              this.steps.unshift({
                  isUser: true,
                  text: 'Игрок применил супер-удар и отнял ' + damage + ' очков здоровья' 
              });
              this.monsterHealth = this.monsterHealth - damage;

              if (this.returnResult()) {
                  return;
              }
              this.monsterAttacks(); 
          },
          heal: function() {
              if (this.userHealth <= 90) {
                  this.userHealth += 10;
              }
              else {
                  this.userHealth = 100;
              }

              this.steps.unshift({
                  isUser: true,
                  text: 'Игрок добавил лечением 10 очков здоровья' 
              });
              this.monsterAttacks();
          },
          giveUp: function() {
              this.isRunning = false;
          }
      }
    
});