<template>
    <div class="p-3" style="max-width: 400px; margin: 50px auto; background: #234">

        <!-- Calculator Result -->
        <div class="w-full rounded m-1 p-3 text-right lead font-weight-bold text-white bg-vue-dark">
            {{ calculatorValue || 0 }}
        </div>

        <!-- Calculator buttons -->
        <div class="row no-gutters">
            <div class="col-3" v-for="n in calculatorElements" :key="n">
                <div class="lead text-white text-center m-1 py-3 bg-vue-dark rounded hover-class"
                    :class="{'bg-vue-green': ['C','*','/','-','+','%','='].includes(n)}" @click="action(n)">
                    {{n}}
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'Calculator',
    props: {
        msg: String
    },

    data() {
        return {
            calculatorValue: '',
            calculatorElements: ['C', ' ', ' ', ' ', '+', 1, 2, 3, '-', 4, 5, 6, '*', 7, 8, 9, '/', '.', 0, '='],
            operator: true,
            previousCalculatorValue: '',
            currentNumber: [],
            equasion: [],
            reload: true,
        }
    },

    methods: {
        async action(n) {
            if (this.reload) {
                this.calculatorValue = '';
                this.equasion = [];
                this.currentNumber = [];
                this.reload = false;
            }
            switch (true) {
                /* Append value */
                case (!isNaN(n) || n === '.'): {
                    if (n === ' ') return;
                    if (n === '.' && this.currentNumber.includes('.')) {
                        return;
                    }
                    if (this.currentNumber[0] === '.') {
                        this.currentNumber = [0].concat(this.currentNumber);
                    }
                    this.calculatorValue += n + '';
                    this.currentNumber.push(n);
                    this.operator = false;
                    break;
                }
    
                /* Clear value */
                case (n === 'C'): {
                    this.calculatorValue = '';
                    this.equasion = [];
                    this.currentNumber = [];
                    break;
                }
    
                /* Operators */
                case (['/', '*', '-', '+'].includes(n)): {
                    if (!this.operator) {
                        this.calculatorValue += n + '';
                        this.equasion.push(this.currentNumber.join(''));
                        this.equasion.push(n);
                        this.currentNumber = [];
                        this.operator = true;
                    }
                    break;
                }
    
                /* Calculate result using the eval function */
                case (n === '='): {
                    this.equasion.push(this.currentNumber.join(''));
                    const response = await (await fetch('http://localhost:3000/calc', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({
                            expression: this.equasion.join(' ')
                        })
                    })).json();
                    if (response.status) {
                        this.calculatorValue = response.answer
                    } else {
                        this.calculatorValue = response.msg
                    }
                    this.reload = true;
                    break;
                }

                default: {
                    return;
                }
            }

        }
    }
}
</script>
  
  
<style scoped>
.bg-vue-dark {
    background: #31475e;
}

.hover-class:hover {
    cursor: pointer;
    background: #3D5875;
}

.bg-vue-green {
    background: #3fb984;
}
</style>