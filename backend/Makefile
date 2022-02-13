serve:
	docker run --rm -p 8500:8500 -p 8501:8501 --name tfserving_classifier \
	--mount type=bind,source=/Users/thanh/Desktop/distracted_driver_detection/backend/temp_models/,target=/models/ \
	--mount type=bind,source=/Users/thanh/Desktop/distracted_driver_detection/backend/temp_models/serving.config,target=/models/serving.config \
	-t tensorflow/serving \
	--model_config_file=/models/serving.config \
	--model_config_file_poll_wait_seconds=3600


.PHONY: serve