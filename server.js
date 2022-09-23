const express = require('express')
const app = express();
const path = require('path');
const {conn, Patient, Provider} = require('./db')

app.use(express.json())
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/hello', async(req,res,next) => {
    res.send("<div>Hello World</div>")
})


app.get('/api/patients', async(req,res,next) => {
    try{
        res.send(await Patient.findAll());
    }
    catch(e){
        next(e)
    }
})

app.get('/api/providers', async(req,res,next) => {
    try{
        res.send(await Provider.findAll());
    }
    catch(e){
        next(e)
    }
})

app.use('/', async(error, req,res,next) => {
    try {
        res.status(404);
    }
    catch(error){
        console.log(error)
    }
})

const init = async() => {
    try{
        await conn.sync({force: true});
        await Promise.all([
            Patient.create({name: 'Han', age: 25, HPI:'pt presents w ULQ abd pain, radiates inferior-medially, denies use of meds, visibly sweats from medical anxiety, and spilled coffee on my white coat', hx:'Paroxysmal supraventricular tachycardia. Chronic Migraines.'}),
            Patient.create({name: 'Gamma', age: 65, HPI: 'pt presents with railroad spike lodged deep through the temporal and frontal lobes, half-severing the prefrontal cortex yet barely avoiding the hippocampus and amygdala. pt disposition allegedly changed after the incident', hx: 'Type II Diabetic. Paternal stage 2 hypertension'}),
            Patient.create({name: 'Epsilon', age: 5, HPI: 'pt presents with unhealthy obsessission with sugar and methylenedioxymethamphetamine. pt allegedly mixes both in her daily formula, quoting that her TikTok followers pressured her into doing it', hx: 'Autoimmune deficiency syndrome (prenatal), type 4 allergic rxn (granulomatous bronchiolar histo) d/t mismatch lung transplant'}),
            Provider.create({name: 'Delta', specialty: 'rectologist', about: "Could give a rat's ass about you... but ass is the focus here."}),
            Provider.create({name: 'Zeta', specialty: 'radiology fellow', about: 'xrays are pretty cool but I guess you risk developing cancer at any moment'}),
            Provider.create({name: 'Mu', specialty: 'intern of an internist', about: "not sure why I'm here besides getting a recommendation letter, 1k hours of clinical experience, 2k hours of research experience, and 3k hours volunteering in an oncological orphanarium"})
        ]);
        app.listen(5000, () => console.log(`listening on port 5000`))
    }
        catch(e){
            console.log(e)
        }
}

init();
