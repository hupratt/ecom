
def labels = ['master','slave'] 
def builders = [:]
for (x in labels) {
    def label = x // Need to bind the label variable before the closure 

    // Create a map to pass in to the 'parallel' step so we can fire all the builds at once
    builders[label] = {
		timestamps {
			node () {
				
				def PROJECT="/home/ubuntu/Dev/ecom"
				def PYTHON_P="$PROJECT/bin/python3.6"
				def GET_SECRET="/var/lib/jenkins/run_vars_ecom.py"
				
				stage ('Checkout') {
					// checkout scm
					sh """ 
					whoami
					sudo service apache2 stop
					cd $PROJECT
					sudo git fetch --all
					sudo git reset --hard origin/master
					"""
				}

				stage ('Build') {
					
					sh """ 

					cd $PROJECT
					npm run build
					sudo chmod -R 770 $PROJECT
					sudo chown -R ubuntu:www-data $PROJECT
					. bin/activate
					echo 'which python are you running?'
					which python
					

					$PYTHON_P -m pip install --upgrade pip # Upgrade pip
					echo 'pip upgrade done'
					$PYTHON_P -m pip install -r requirements.txt # Install or upgrade dependencies
					echo 'pip install done'
					$PYTHON_P $GET_SECRET
					echo 'var import done'
					
					cd ecom
					$PYTHON_P manage.py migrate                  
					echo 'manage.py migrate done'

					# sudo /usr/local/bin/compile_messages

					# $PYTHON_P manage.py collectstatic --noinput --settings=home.settings
					echo 'manage.py collectstatic done'

					deactivate # quit the virtual environment

					sudo service apache2 start

					""" 
				}
			}
		}
    }
}

throttle(['loadbalancer']) {
  parallel builders
}




