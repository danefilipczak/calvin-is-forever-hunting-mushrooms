globalSpecimenCounter = 0;

function Specimen(data) {
	
	this.species = data.species || 'fungus amungus';
	this.loc = data.loc || {lat: 334322, lng: 42222};

	this.notes = data.notes;

	//asign each specimen a unique id integer in case there are duplicate instances of the same species
	this.id = globalSpecimenCounter++;


}