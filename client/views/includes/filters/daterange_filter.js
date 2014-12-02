Template.daterangeFilter.rendered = function(){
	if (!this.rendered){

		this.$('.daterange').daterangepicker({
			format: "DD/MM/YYYY",
			multidate: true
		}, function(start, end){
			console.log(end);
			alert(start.format('DD/MM/YYYY') + ' ' + end.format('DD/MM/YYYY'));
		});

		this.rendered = true;
	}
}