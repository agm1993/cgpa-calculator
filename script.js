		function get_gradepoint(grade, hours) {
			var gradepoint
			var gradevalue
			grades = {"A": 4.00, "A-": 3.70, "B+": 3.30, "B": 3.00, "B-": 2.70, "C+": 2.30, "C": 2.00, "C-": 1.70, "D+": 1.30, "D": 1.00, "D-": 0.70, "F": 0.00, "WP":0.00, "WF": 0.00}
			gradevalue = grades[grade]
			gradepoint = (gradevalue * hours)
			return gradepoint
		}

		function calculator() {
			var credits = document.getElementsByName('credit[]')
			var grades = document.getElementsByName('grade[]')
			var courses = document.getElementsByName('course[]')

			var credit_array = []
			var grade_array = []
			var course_array = []
	
			for (var i = 0; i < credits.length; i++) {
				credit_array.push(credits[i].value)
				grade_array.push(grades[i].value)
				course_array.push(courses[i].value)
			}
	
			var calculated = gpa_calculator(grade_array, credit_array, course_array)
			var gpa_value = calculated[0]
			var total_gradepoint = calculated[1]
			var total_credit = calculated[2]
	
			document.forms["gpa_calculator"].gpa.value = gpa_value.slice(0,-2)
			document.forms["gpa_calculator"].credits.value = total_credit
			document.forms["gpa_calculator"].grades.value = total_gradepoint.slice(0,-2)
	
			if (gpa_value >= 3.8) {
				document.forms["gpa_calculator"].standing.value = "President's List"}
			else if ((gpa_value >= 3.5) && (gpa_value < 3.8)){
				document.forms["gpa_calculator"].standing.value = "Dean's List"}
			else if ((gpa_value >= 2) && (gpa_value < 3.5)){
				document.forms["gpa_calculator"].standing.value = "Good Standing"}
			else if (gpa_value < 2){
				document.forms["gpa_calculator"].standing.value = "See Your Advisor!!!"
			}
	
			if (gpa_value >= 3.5) {
				document.images['gpa_image'].style.visibility = "visible";
			}
			else {
				document.images['gpa_image'].style.visibility = "hidden";
			}
	
			var prev_cgpa = document.forms["gpa_calculator"].cgpa.value
			var prev_credits = document.forms["gpa_calculator"].tcredits.value
			var curr_gpa = gpa_value
			var curr_credits = total_credit
	
			var gpa_array = []
			var credit_total = []
	
			gpa_array.push(prev_cgpa)
			gpa_array.push(curr_gpa)
			credit_total.push(prev_credits)
			credit_total.push(curr_credits)
	
			var cgpa = cgpa_calculator(gpa_array, credit_total)
			document.forms["gpa_calculator"].ncgpa.value = cgpa.slice(0,-2)
	
			return false
		}

		function gpa_calculator(grade_array, credit_array, course_array) {
			var gpa
			var grade_each
			var total_credit = 0
			var total_gradepoint = 0
			var j = 1
		
			for (var i = 0; i < grade_array.length; i++) {
				if ((grade_array[i] != "--") && (credit_array[i] != "--")) {
					if (grade_array[i] == "WP") {
						credit_array[i] = 0
					}
					grade_each = get_gradepoint(grade_array[i], credit_array[i])
					total_gradepoint += grade_each
					total_credit += parseInt(credit_array[i])
					j += 1
				}
			}
	
			gpa = (total_gradepoint.toFixed(4)/total_credit)
			return [gpa.toFixed(4), total_gradepoint.toFixed(4), total_credit]
		}

		function cgpa_calculator(gpa_array, credit_total) {
			var cgpa;
			var sum_credit = 0
			var sum_gradepoint = 0
			
			for (var i = 0; i < gpa_array.length; i++) {
				if ((gpa_array != "") && (gpa_array[i] >= 0) && (gpa_array[i] <= 4.00) && (credit_total[i] > 0)) {
					sum_credit += parseInt(credit_total[i])
					sum_gradepoint += (gpa_array[i] * parseInt(credit_total[i]))
				}
			}
	
			cgpa = (sum_gradepoint/sum_credit)
			return cgpa.toFixed(4)
		}

		function raise_cgpa() {
			var previous_cgpa = document.forms["gpa_calculator"].cgpa.value
			var previous_credits = document.forms["gpa_calculator"].tcredits.value
			var cgpa_to_raise = document.forms["raise_cgpa"].cgparaise.value
			var current_credits = document.forms["raise_cgpa"].creditraise.value
			var gpa_to_get
			var sum = 0
			var sum2 = 0
			var sum3 = 0
	
			if (cgpa_to_raise < previous_cgpa) {
				alert("The CGPA you wish to raise to should be greater than your current CGPA")
				return false
			}
	
			if ((cgpa_to_raise >= 0) && (cgpa_to_raise <= 4.00) && (current_credits > 0)
			&& (previous_cgpa >= 0) && (previous_cgpa <= 4.00 ) && (previous_credits> 0)) {
				sum = cgpa_to_raise * (parseInt(current_credits) + parseInt(previous_credits))
				sum2 = parseInt(previous_credits) * previous_cgpa
				sum3 = sum - sum2
			}
	
			gpa_to_get = sum3/parseInt(current_credits)
			document.forms["raise_cgpa"].cgpaget.value = gpa_to_get.toFixed(4).slice(0,-2)
	
			return false
		}